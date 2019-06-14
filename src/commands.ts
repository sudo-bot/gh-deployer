'use strict';

import comments from '@src/comments';
import data from '@src/data';
import logger from '@src/logger';
const nodenpl = require('node-nlp');

const manager = new nodenpl.NlpManager({
    languages: ['en'],
    ner: {
        builtins: [],
        builtinWhitelist: [],
    },
});

const branch = manager.addTrimEntity('branch');
branch.addAfterFirstCondition('en', 'branch');

const branchSrc = manager.addTrimEntity('branchSrc');
branchSrc.addBetweenCondition('en', 'merge', 'into');

const branchDst = manager.addTrimEntity('branchDst');
branchDst.addAfterFirstCondition('en', 'into');
branchDst.addBetweenCondition('en', 'into', 'and');
//manager.addRegexEntity('branchDst', 'en', /(?: )\S+(?= )/ig);

manager.addRegexEntity('configBlock', 'en', data.regexConfigBlock);

manager.slotManager.addSlot('merge', 'branch', false, {});

manager.slotManager.addSlot('merge_from_into', 'branchSrc', false, {});

manager.slotManager.addSlot('merge_from_into', 'branchDst', false, {});

manager.slotManager.addSlot('use_config', 'configBlock', false, {});

export enum COMMANDS {
    DEPLOY_AND_MERGE = 'deploy_and_merge',
    DEPLOY_AND_MERGE_WITH_CONFIG = 'deploy_and_merge_with_config',
    DEPLOY_WITH_CONFIG = 'deploy_with_config',
    DEPOY_PR = 'deploy_pr',
    SEND_CREDS = 'send_creds',
    DO_NOTHING = 'do_nothing',
}

const DEPLOY_COMMANDS: string[] = [
    '/deploy PR',
    '/deploy pull request',
    '/deploy pull-request',
    'Deploy my pull request please',
    'Deploy',
    '@sudo-bot deploy',
    '@sudo-bot /deploy',
    '@sudo-bot deploy',
    '@user please test the PR deployed by @sudo-bot',
    'Deploy this PR',
    'send me my creds',
];

const DO_NOTHING_COMMANDS: string[] = [
    '',
    ' ',
    'Do nothing',
    'Hello',
    'What does the fox say',
    '/help',
    'Send me infos',
    'amazing',
    '_',
    'A lot of love for you',
    ':confused:',
    'merged',
    'branch deployed',
    'The pull-request is deployed',
    'branch deployed and merged into master',
    'I have deployed the PR',
    'I have deployed the pull-request',
    '@user I have deployed the PR',
    'Closed by 7ddb6be, Merged :tada:',
    'Merged into master',
    '@user-name The PR is deployed on the server',
    'Can you please use the deployed instance ?',
    'deployed instance',
    'Deployed on the server',
    'I love you',
    '@user123654 Yes, see: sudo-bot/gh-deployer#1',
    comments.getPendingComment(123654987, 'head/refs/pr-123456', '40bd001563085fc35165329ea1ff5c5ecbdbbeef'),
    comments.getDeployedComment(
        123654987,
        'head/refs/pr-123456',
        '40bd001563085fc35165329ea1ff5c5ecbdbbeef',
        'test-pr-123654',
        'example.com'
    ),
    '@sudo-bot :)',
];

const DEPLOY_AND_MERGE_WITH_CONFIG_COMMANDS: string[] = [
    //'Deploy, merge %branchSrc% into %branchDst% and use config %configBlock%',
    //'Merge %branchSrc% into %branchDst% and use config %configBlock% and deploy',
];

const DEPLOY_WITH_CONFIG_COMMANDS: string[] = [
    'Deploy, and use config %configBlock%',
    'Deploy, and use configuration %configBlock%',
    'Use config %configBlock% and deploy',
    'Use configuration %configBlock% and deploy',
];

const DEPLOY_AND_MERGE_COMMANDS: string[] = [
    //'deploy %branchSrc% and merge it into %branchDst%',
    //'deploy %branchSrc% and merge it into branch %branchDst%',
    //'Deploy and merge %branchSrc% into %branchDst%',
    //'Merge %branchSrc% into %branchDst% and deploy',
    //'Merge and deploy %branchSrc% into %branchDst%',
    //'Then deploy and merge %branchSrc% into %branchDst%',
    //'Deploy, Merge %branchSrc% into %branchDst%',
    //'Deploy the PR, Merge %branchSrc% into %branchDst%',
    //'Merge %branchSrc% into %branchDst% and deploy PR',
    //'Merge %branchSrc% into %branchDst% and deploy pull-request',
    //'Deploy pull-request and Merge %branchSrc% into %branchDst%',
];

const CREDS_COMMANDS: string[] = [
    'send me my credentials',
    'Can you send me my credentials for the servers',
    'send credentials',
    'what are the user and password ?',
];

logger.info('Start to learn');
manager.addDocument('en', 'Deploy branch and merge into %branch%', COMMANDS.DEPLOY_AND_MERGE);
manager.addDocument('en', 'Deploy PR and merge into %branch%', COMMANDS.DEPLOY_AND_MERGE);
manager.addDocument('en', 'Deploy pull-request and merge into %branch%', COMMANDS.DEPLOY_AND_MERGE);
DEPLOY_COMMANDS.forEach(command => {
    manager.addDocument('en', command, COMMANDS.DEPOY_PR);
});
logger.debug('Learned ' + DEPLOY_COMMANDS.length + ' deploy commands');
CREDS_COMMANDS.forEach(command => {
    manager.addDocument('en', command, COMMANDS.SEND_CREDS);
});
logger.debug('Learned ' + DEPLOY_COMMANDS.length + ' creds commands');
DO_NOTHING_COMMANDS.forEach(command => {
    manager.addDocument('en', command, COMMANDS.DO_NOTHING);
});
logger.debug('Learned ' + DO_NOTHING_COMMANDS.length + ' do nothing commands');
logger.info('Learn harder');

//manager.addDocument('en', 'Merge branch %branch%', 'merge');
// manager.addDocument('en', 'Use config %configBlock%', 'use_config');
// manager.addDocument('en', 'Configuration %configBlock%', 'use_config');
// manager.addDocument('en', 'Configuration %configBlock%', 'use_config');
// manager.addDocument('en', 'php config %configBlock%', 'use_config');
// manager.addDocument('en', 'use config %configBlock%', 'use_config');
//manager.addDocument('en', 'Merge %branchSrc% into %branchDst%', 'merge_from_into');

DEPLOY_AND_MERGE_COMMANDS.forEach(command => {
    manager.addDocument('en', command, COMMANDS.DEPLOY_AND_MERGE);
});
logger.debug('Learned ' + DEPLOY_AND_MERGE_COMMANDS.length + ' deploy and merge with config commands');

DEPLOY_AND_MERGE_WITH_CONFIG_COMMANDS.forEach(command => {
    manager.addDocument('en', command, COMMANDS.DEPLOY_AND_MERGE_WITH_CONFIG);
});
logger.debug('Learned ' + DEPLOY_AND_MERGE_WITH_CONFIG_COMMANDS.length + ' deploy and merge with config commands');

DEPLOY_WITH_CONFIG_COMMANDS.forEach(command => {
    manager.addDocument('en', command, COMMANDS.DEPLOY_WITH_CONFIG);
});
logger.debug('Learned ' + DEPLOY_WITH_CONFIG_COMMANDS.length + ' deploy and merge with config commands');

logger.info('End of the lesson');

export interface commandData {
    command: string;
    options: any;
    debug: object;
}

interface responseManager {
    intent: string;
    entities: [
        {
            entity: string;
            utteranceText: string;
        }
    ];
}

export default {
    train: () => {
        return manager.train();
    },
    COMMANDS: COMMANDS,
    DEPLOY_COMMANDS: DEPLOY_COMMANDS,
    DO_NOTHING_COMMANDS: DO_NOTHING_COMMANDS,
    CREDS_COMMANDS: CREDS_COMMANDS,
    DEPLOY_AND_MERGE_WITH_CONFIG_COMMANDS: DEPLOY_AND_MERGE_WITH_CONFIG_COMMANDS,
    DEPLOY_AND_MERGE_COMMANDS: DEPLOY_AND_MERGE_COMMANDS,
    DEPLOY_WITH_CONFIG_COMMANDS: DEPLOY_WITH_CONFIG_COMMANDS,
    getCommand: (text: string) => {
        return new Promise((resolve: (data: commandData) => void, reject) => {
            manager
                .process('en', text, {})
                .then((responseManager: responseManager) => {
                    resolve({
                        command: responseManager.intent === 'None' ? COMMANDS.DO_NOTHING : responseManager.intent,
                        options: responseManager.entities.reduce(
                            (accumulator, target) => ({
                                ...accumulator,
                                [target.entity]: target.utteranceText,
                            }),
                            {}
                        ),
                        debug: responseManager,
                    });
                })
                .catch(reject);
        });
        //return manager.getBestClassification(text).label;
    },
};
