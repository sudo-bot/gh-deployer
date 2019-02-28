'use strict';

const bayes = require('bayes');
const Sentencer = require('sentencer');
const comments = require('@src/comments');
const logger = require('@src/logger');
const classifier = bayes();

const COMMANDS = {
    DEPLOY_AND_MERGE_MASTER: 'deploy_pr_and_merge_master',
    DEPOY_PR: 'deploy_pr',
    SEND_CREDS: 'send_creds',
    DO_NOTHING: 'do_nothing',
};

logger.info('Start to learn');
classifier.learn(
    comments.getPendingComment(
        123654987,
        'head/refs/pr-123456',
        '40bd001563085fc35165329ea1ff5c5ecbdbbeef'
    ),
    COMMANDS.DO_NOTHING
);
classifier.learn(
    comments.getDeployedComment(
        123654987,
        'head/refs/pr-123456',
        '40bd001563085fc35165329ea1ff5c5ecbdbbeef',
        'test-pr-123654',
        'example.com'
    ),
    COMMANDS.DO_NOTHING
);
classifier.learn('@sudo-bot :)', COMMANDS.DO_NOTHING);
classifier.learn(
    'Deploy my pull request please then merge it into master',
    COMMANDS.DEPLOY_AND_MERGE_MASTER
);
classifier.learn('Merge it into master and deploy', COMMANDS.DEPLOY_AND_MERGE_MASTER);
classifier.learn('Deploy PR and merge into master', COMMANDS.DEPLOY_AND_MERGE_MASTER);
classifier.learn('Deploy PR and merge it into master', COMMANDS.DEPLOY_AND_MERGE_MASTER);
classifier.learn(
    'Deploy pull-request and merge into master',
    COMMANDS.DEPLOY_AND_MERGE_MASTER
);
classifier.learn('/deploy PR', COMMANDS.DEPOY_PR);
classifier.learn('Deploy my pull request please', COMMANDS.DEPOY_PR);
classifier.learn('Deploy', COMMANDS.DEPOY_PR);
classifier.learn('@sudo-bot deploy', COMMANDS.DEPOY_PR);
classifier.learn('@sudo-bot /deploy', COMMANDS.DEPOY_PR);
classifier.learn('@sudo-bot deploy', COMMANDS.DEPOY_PR);
classifier.learn('@user please test the PR deployed by @sudo-bot', COMMANDS.DEPOY_PR);
classifier.learn('Deploy this PR', COMMANDS.DEPOY_PR);
classifier.learn('send me my creds', COMMANDS.DEPOY_PR);
classifier.learn('send me my creds', COMMANDS.SEND_CREDS);
classifier.learn('send credentials', COMMANDS.SEND_CREDS);
classifier.learn('what are the user and password ?', COMMANDS.SEND_CREDS);
classifier.learn('', COMMANDS.DO_NOTHING);
classifier.learn(' ', COMMANDS.DO_NOTHING);
classifier.learn('Do nothing', COMMANDS.DO_NOTHING);
classifier.learn('Hello', COMMANDS.DO_NOTHING);
classifier.learn('What does the fox say', COMMANDS.DO_NOTHING);
classifier.learn('/help', COMMANDS.DO_NOTHING);
classifier.learn('Send me infos', COMMANDS.DO_NOTHING);
classifier.learn('amazing', COMMANDS.DO_NOTHING);
classifier.learn('_', COMMANDS.DO_NOTHING);
classifier.learn('A lot of love for you', COMMANDS.DO_NOTHING);
classifier.learn(':confused:', COMMANDS.DO_NOTHING);
classifier.learn('', COMMANDS.DO_NOTHING);
logger.info('Learn harder');
for (let i = 0; i < 9000; i++) {
    let sentence = Sentencer.make('{{ a_noun }} {{ an_adjective }} {{ noun }}');
    classifier.learn(sentence, COMMANDS.DO_NOTHING);
}
logger.info('End of the lesson');

// serialize the classifier's state as a JSON string.
//var stateJson = classifier.toJson();
// load the classifier back from its JSON representation.
//var revivedClassifier = bayes.fromJson(stateJson)

module.exports = {
    COMMANDS: COMMANDS,
    getCommand: text => {
        return classifier.categorize(text);
    },
};
