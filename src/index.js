'use strict';

const logger = require('@src/logger');
const deploy = require('@src/deploy');
const commands = require('@src/commands');
const mail = require('@src/mail/index');
const data = require('@src/data');

logger.debug('Training...');
commands
    .train()
    .then(() => {
        logger.debug('End of training');
        mail(emailInfos => {
            logger.debug('New email', emailInfos);
            if (emailInfos.requestedByUser === process.env.ROBOT_USER) {
                logger.info('From-me:', emailInfos.message);
            } else {
                commands
                    .getCommand(emailInfos.message)
                    .then(commandData => {
                        switch (commandData.command) {
                            case commands.COMMANDS.DEPOY_PR:
                            case commands.COMMANDS.DEPLOY_AND_MERGE:
                            case commands.COMMANDS.DEPLOY_AND_MERGE_WITH_CONFIG:
                                deploy.deploy(emailInfos, data.compiledPhpMyAdminConfig);
                                break;
                            case commands.COMMANDS.DEPLOY_WITH_CONFIG:
                                deploy.deploy(
                                    emailInfos,
                                    data.protectConfig(data.getDataFromConfig(commandData.options.configBlock).trim())
                                );
                                break;
                            case commands.COMMANDS.DO_NOTHING:
                                // No nothing
                                break;
                            default:
                                logger.warn('Unhandled action', commandData, commands.COMMANDS, emailInfos);
                                break;
                        }
                    })
                    .catch(error => logger.error(error));
            }
        });
    })
    .catch(error => logger.error(error));

module.exports = {
    mail: mail,
};
