'use strict';

/**
 * Copyright (c) 2012-2014 Chirag Jain
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following
 * conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 */

var Imap = require('imap');
var util = require('util');
var EventEmitter = require('events').EventEmitter;
var MailParser = require('mailparser').MailParser;
var async = require('async');

module.exports = MailListener;

function MailListener(options) {
    this.markSeen = !!options.markSeen;
    this.mailbox = options.mailbox || 'INBOX';
    if ('string' === typeof options.searchFilter) {
        this.searchFilter = [options.searchFilter];
    } else {
        this.searchFilter = options.searchFilter || ['UNSEEN'];
    }
    this.fetchUnreadOnStart = !!options.fetchUnreadOnStart;
    this.mailParserOptions = options.mailParserOptions || {};
    this.imap = new Imap({
        xoauth2: options.xoauth2,
        user: options.username,
        password: options.password,
        host: options.host,
        port: options.port,
        tls: options.tls,
        tlsOptions: options.tlsOptions || {},
        connTimeout: options.connTimeout || null,
        authTimeout: options.authTimeout || null,
        debug: options.debug || null,
    });

    this.imap.once('ready', imapReady.bind(this));
    this.imap.once('close', imapClose.bind(this));
    this.imap.on('error', imapError.bind(this));
}

util.inherits(MailListener, EventEmitter);

MailListener.prototype.start = function() {
    this.imap.connect();
};

MailListener.prototype.stop = function() {
    this.imap.end();
};

function imapReady() {
    var self = this;
    this.imap.openBox(this.mailbox, false, function(err, mailbox) {
        if (err) {
            self.emit('error', err);
        } else {
            self.emit('server:connected');
            if (self.fetchUnreadOnStart) {
                parseUnread.call(self);
            }
            var listener = imapMail.bind(self);
            self.imap.on('mail', listener);
            self.imap.on('update', listener);
        }
    });
}

function imapClose() {
    this.emit('server:disconnected');
}

function imapError(err) {
    this.emit('error', err);
}

function imapMail() {
    parseUnread.call(this);
}

function parseUnread() {
    var self = this;
    this.imap.search(self.searchFilter, function(err, results) {
        if (err) {
            self.emit('error', err);
        } else if (results.length > 0) {
            async.each(
                results,
                function(result, callback) {
                    var f = self.imap.fetch(result, {
                        bodies: '',
                        markSeen: self.markSeen,
                    });
                    f.on('message', function(msg, seqno) {
                        var parser = new MailParser(self.mailParserOptions);
                        var attributes = null;
                        var emlbuffer = new Buffer('');

                        parser.on('end', function(mail) {
                            mail.eml = emlbuffer.toString('utf-8');
                            self.emit('mail', mail, seqno, attributes);
                        });
                        msg.on('body', function(stream, info) {
                            stream.on('data', function(chunk) {
                                emlbuffer = Buffer.concat([emlbuffer, chunk]);
                            });
                            stream.once('end', function() {
                                parser.write(emlbuffer);
                                parser.end();
                            });
                        });
                        msg.on('attributes', function(attrs) {
                            attributes = attrs;
                        });
                    });
                    f.once('error', function(err) {
                        self.emit('error', err);
                    });
                },
                function(err) {
                    if (err) {
                        self.emit('error', err);
                    }
                }
            );
        }
    });
}