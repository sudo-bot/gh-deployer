'use strict';

const logger = require('@src/logger');
const deploy = require('@src/deploy');
const commands = require('@src/commands');
const data = require('@src/data');
const smtp = require('@src/smtp');

smtp.smtpServer((stream, callback) => {
    data.parseEmail(stream)
        .then(emailInfos => {
            callback();
            if (emailInfos.requestedByUser === process.env.ROBOT_USER) {
                logger.info('From-me:', emailInfos.message);
            } else {
                let action = data.getDataFromMessage(emailInfos.message);
                switch (action) {
                    case commands.COMMANDS.DEPOY_PR:
                    case commands.COMMANDS.DEPLOY_AND_MERGE_MASTER:
                        deploy.deploy(emailInfos);
                        break;
                    case commands.COMMANDS.DO_NOTHING:
                        // No nothing
                        break;
                    default:
                        logger.warn('Unhandled action', action, commands.COMMANDS, emailInfos);
                        break;
                }
            }
        })
        .catch(error => logger.error(error));
})
    .then(smtpServer => {
        smtpServer.listen(process.env.SMTP_PORT || 25, '0.0.0.0', () => {
            logger.info('Listening...');
        });
    })
    .catch(error => logger.error(error));

module.exports = {
    smtp: smtp,
};
