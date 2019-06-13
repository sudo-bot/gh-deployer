'use strict';

import smtpFakeServer from '@src/mail/smtp';
import imapMailbox from '@src/mail/imap';
import logger from '@src/logger';

export default class {
    constructor(cbData) {
        let mode = process.env.SMTP_MODE || '';
        switch (mode.toUpperCase()) {
            case 'MAILBOX':
                return new imapMailbox(cbData);
            case 'FAKE_SMTP_SERVER':
                return new smtpFakeServer(cbData);
            default:
                logger.error('SMTP_MODE not handled', mode);
                break;
        }
    }
}
