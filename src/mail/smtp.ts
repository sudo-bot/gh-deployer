'use strict';

import logger from '@src/logger';
import { SMTPServer } from 'smtp-server';
import data, { emailData } from '@src/data';
import { Source } from 'mailparser';

export default class {
    constructor(cbData: (data: emailData) => void) {
        logger.debug('Using fake smtp server smtp mode');
        try {
            const smtpServer = new SMTPServer({
                secure: false,
                name: process.env.SMTP_SERVER_NAME,
                authOptional: true,
                banner: process.env.SMTP_SERVER_NAME,
                disableReverseLookup: false,
                maxClients: parseInt(process.env.SMTP_MAX_CLIENTS || '100'),
                /*onAuth: (auth, session, callback) => {
                        logger.info(auth, session);
                        return callback(); // Accept the auth
                    },
                    onConnect: (session, callback) => {
                        logger.info('onConnect', session);
                        if (session.remoteAddress === '127.0.0.1') {
                            return callback(new Error('No connections from localhost allowed'));
                        }
                        return callback(); // Accept the connection
                    },
                    onMailFrom: (address, session, callback) => {
                        logger.info('onMailFrom', session, address.address);
                        return callback(); // Accept the address
                    },*/
                onRcptTo: (address, session, callback) => {
                    //logger.info(address, session);
                    if (data.destinationEmails.includes(address.address) === false) {
                        logger.info(address.address + ' does not exist !');
                        return callback(new Error('This email does not exist !'));
                    }
                    return callback(); // Accept the address
                },
                onData: (stream: Source, session, callbackAccepted: () => void) => {
                    data.parseEmail(stream)
                        .then(emailInfos => {
                            callbackAccepted();
                            cbData(emailInfos);
                        })
                        .catch(err => {
                            logger.error(err);
                        });
                },
            }).listen(parseInt(process.env.SMTP_PORT || '25'), '0.0.0.0', () => {
                logger.info('Listening...');
            });
            return smtpServer;
        } catch (error) {
            logger.error(error);
        }
    }
}
