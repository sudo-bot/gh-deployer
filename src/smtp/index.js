'use strict';

const smtpFakeServer = require('@src/smtp/smtp');
const smtpMailbox = require('@src/smtp/mailbox');
const logger = require('@src/logger');

module.exports = {
    smtpServer: cbData => {
        let mode = process.env.SMTP_MODE || '';
        switch (mode.toUpperCase()) {
            case 'MAILBOX':
                return smtpMailbox.smtpServer(cbData);
            case 'FAKE_SMTP_SERVER':
                return smtpFakeServer.smtpServer(cbData);
            default:
                logger.error('SMTP_MODE not handled', mode);
                break;
        }
    },
};
