'use strict';

const logger = require('@src/logger');
const data = require('@src/data');
const MailListener = require('@utils/mail-listener2');

module.exports = {
    smtpServer: cbData => {
        logger.debug('Using mailbox smtp mode');
        try {
            const debugImap = process.env.MAILBOX_DEBUG && process.env.MAILBOX_DEBUG.toUpperCase() === 'TRUE';
            const mailListener = new MailListener({
                username: process.env.MAILBOX_USERNAME,
                password: process.env.MAILBOX_PASSWORD,
                host: process.env.MAILBOX_HOST,
                port: process.env.MAILBOX_PORT, // imap port
                tls: process.env.MAILBOX_TLS.toUpperCase() === 'TRUE',
                connTimeout: 10000, // Default by node-imap
                authTimeout: 5000, // Default by node-imap,
                debug: (...params) => {
                    if (debugImap) {
                        logger.debug(...params);
                    }
                }, // Or your custom function with only one incoming argument. Default: null
                tlsOptions: { rejectUnauthorized: false },
                mailbox: 'INBOX', // mailbox to monitor
                searchFilter: ['UNSEEN'], // the search filter being used after an IDLE notification has been retrieved
                markSeen: true, // all fetched email willbe marked as seen and not fetched next time
                fetchUnreadOnStart: true, // use it only if you want to get all unread email on lib start. Default is `false`,
            });
            mailListener.start(); // start listening
            // stop listening
            //mailListener.stop();
            mailListener.on('server:connected', function() {
                logger.info('imapConnected');
            });
            mailListener.on('server:disconnected', function() {
                logger.info('imapDisconnected');
            });
            mailListener.on('error', function(err) {
                logger.error(err);
            });
            mailListener.on('mail', function(parsed, seqno, attributes) {
                // do something with mail object including attachments
                logger.info('emailParsed', parsed);
                // mail processing code goes here
                data.getDataFromParsedEmail(parsed, cbData, err => {
                    logger.error(err);
                });
            });
            return mailListener;
        } catch (error) {
            logger.error(error);
        }
    },
};
