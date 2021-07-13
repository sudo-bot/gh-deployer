'use strict';

import { Stream } from 'stream';

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

import Imap = require('imap');
import { EventEmitter } from 'events';

export interface processedEmail {
    stream: Stream;
    seqno: number;
    info: Imap.ImapMessageBodyInfo;
}
interface MailListenerEvents {
    on(event: 'ready', onReady: () => void): void;
    on(event: 'close', onClose: () => void): void;
    on(event: 'server:connected', onClose: () => void): void;
    on(event: 'server:disconnected', onClose: () => void): void;
    on(event: 'mail', onMail: (stream: Stream, seqno: number, info: Imap.ImapMessageBodyInfo) => void): void;
    on(event: 'error', onError: (err: Error) => void): void;
}

export default class MailListener extends EventEmitter implements MailListenerEvents {
    private imap: Imap;
    private markSeen: boolean;
    private mailbox: string;
    private searchFilter: string[];
    private fetchUnreadOnStart: boolean;

    constructor(options: {
        username: string;
        password: string;
        host: string;
        port: number;
        tls: boolean;
        connTimeout?: number;
        authTimeout?: number;
        debug: (...params: any) => void;
        tlsOptions: { rejectUnauthorized: boolean };
        mailbox: string;
        searchFilter: string[];
        markSeen: boolean;
        fetchUnreadOnStart?: boolean;
        xoauth2?: string;
    }) {
        super();
        this.markSeen = !!options.markSeen;
        this.mailbox = options.mailbox || 'INBOX';
        if ('string' === typeof options.searchFilter) {
            this.searchFilter = [options.searchFilter];
        } else {
            this.searchFilter = options.searchFilter || ['UNSEEN'];
        }
        this.fetchUnreadOnStart = !!options.fetchUnreadOnStart;
        this.imap = new Imap({
            xoauth2: options.xoauth2,
            user: options.username,
            password: options.password,
            host: options.host,
            port: options.port,
            tls: options.tls,
            tlsOptions: options.tlsOptions || {},
            connTimeout: options.connTimeout || undefined,
            authTimeout: options.authTimeout || undefined,
            debug: options.debug || null,
        });

        const onEmailProcessed = (stream: Stream, seqno: number, info: Imap.ImapMessageBodyInfo) => {
            this.emit('mail', stream, seqno, info);
        };
        const onError = (err: Error) => {
            this.emit('error', err);
        };
        const onReady = () => {
            this.imapReady(
                this.imap,
                this.mailbox,
                this.fetchUnreadOnStart,
                this.searchFilter,
                this.markSeen,
                onEmailProcessed,
                onError,
                () => {
                    this.emit('server:connected');
                    const reProcess = () => {
                        this.parseUnread(this.imap, this.searchFilter, this.markSeen, onEmailProcessed, onError);
                    };
                    this.imap.on('mail', reProcess);
                }
            );
        };
        this.imap.once('ready', onReady);
        this.imap.once('close', () => {
            this.emit('server:disconnected');
        });
        this.imap.on('error', onError);
    }
    start(): void {
        this.imap.connect();
    }
    stop(): void {
        this.imap.end();
    }
    imapReady(
        imap: Imap,
        mailbox: string,
        fetchUnreadOnStart: boolean,
        searchFilter: string[],
        markSeen: boolean,
        onEmailProcessed: (stream: Stream, seqno: number, info: Imap.ImapMessageBodyInfo) => void,
        onError: (err: Error) => void,
        onConnected: () => void
    ) {
        imap.openBox(mailbox, false, (err, mailbox) => {
            if (err) {
                onError(err);
            } else {
                onConnected();
                if (fetchUnreadOnStart) {
                    this.parseUnread(imap, searchFilter, markSeen, onEmailProcessed, onError);
                }
            }
        });
    }
    processEmail(imap: Imap, email: number, markSeen: boolean) {
        return new Promise((resolve: (data: processedEmail) => void, reject: (err: Error) => void) => {
            var f = imap.fetch(email, {
                bodies: '',
                markSeen: markSeen,
            });
            f.on('message', function (msg, seqno) {
                msg.on('body', function (stream, info) {
                    resolve({
                        stream: stream,
                        seqno: seqno,
                        info: info,
                    });
                });
            });
            f.once('error', function (err) {
                reject(err);
            });
        });
    }
    parseUnread(
        imap: Imap,
        searchFilter: string[],
        markSeen: boolean,
        onEmailProcessed: (stream: Stream, seqno: number, info: Imap.ImapMessageBodyInfo) => void,
        onError: (err: Error) => void
    ) {
        imap.search(searchFilter, (err, results) => {
            if (err) {
                onError(err);
            } else if (results.length > 0) {
                Promise.all(
                    results.map((email) => {
                        return this.processEmail(imap, email, markSeen).then((processedEmail: processedEmail) => {
                            onEmailProcessed(processedEmail.stream, processedEmail.seqno, processedEmail.info);
                        });
                    })
                ).catch((err) => {
                    onError(err);
                });
            }
        });
    }
}
