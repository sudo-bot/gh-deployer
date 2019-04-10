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

    const onEmailProcessed = (...params) => {
        this.emit('mail', ...params);
    };
    const onError = err => {
        this.emit('error', err);
    };
    const onReady = () => {
        imapReady(
            this.imap,
            this.mailbox,
            false,//this.fetchUnreadOnStart
            this.searchFilter,
            this.markSeen,
            onEmailProcessed,
            onError,
            () => {
                this.emit('server:connected');
            }
        );
    };
    this.imap.once('ready', onReady);
    this.imap.once('close', () => {
        this.emit('server:disconnected');
    });
    this.imap.on('error', onError);
    const reProcess = () => {
        parseUnread(this.imap, this.searchFilter, this.markSeen, onEmailProcessed, onError);
    };
    this.imap.on('mail', reProcess);
}

util.inherits(MailListener, EventEmitter);

MailListener.prototype.start = function() {
    this.imap.connect();
};

MailListener.prototype.stop = function() {
    this.imap.end();
};

function imapReady(imap, mailbox, fetchUnreadOnStart, searchFilter, markSeen, onEmailProcessed, onError, onConnected) {
    imap.openBox(mailbox, false, function(err, mailbox) {
        if (err) {
            onError(err);
        } else {
            onConnected();
            if (fetchUnreadOnStart) {
                parseUnread(imap, searchFilter, markSeen, onEmailProcessed, onError);
            }
        }
    });
}

function processEmail(imap, email, markSeen) {
    return new Promise((resolve, reject) => {
        var f = imap.fetch(email, {
            bodies: '',
            markSeen: markSeen,
        });
        f.on('message', function(msg, seqno) {
            msg.on('body', function(stream, info) {
                resolve({
                    stream: stream,
                    seqno: seqno,
                    info: info,
                });
            });
        });
        f.once('error', function(err) {
            reject(err);
        });
    });
}

function parseUnread(imap, searchFilter, markSeen, onEmailProcessed, onError) {
    imap.search(searchFilter, function(err, results) {
        if (err) {
            onError(err);
        } else if (results.length > 0) {
            results = results.map(email => {
                return processEmail(imap, email, markSeen).then(processedEmail => {
                    onEmailProcessed(processedEmail.stream, processedEmail.seqno, processedEmail.info);
                });
            });
            Promise.all(results).catch(err => {
                onError(err);
            });
        }
    });
}
