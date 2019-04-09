'use strict';

const smtpFakeServer = require('@src/mail/smtp');
const imapMailbox = require('@src/mail/imap');
const logger = require('@src/logger');

module.exports = cbData => {
    let mode = process.env.SMTP_MODE || '';
    switch (mode.toUpperCase()) {
        case 'MAILBOX':
            return imapMailbox(cbData);
        case 'FAKE_SMTP_SERVER':
            return smtpFakeServer(cbData);
        default:
            logger.error('SMTP_MODE not handled', mode);
            break;
    }
};
