'use strict';

require('module-alias/register');

process.env.ALLOWED_USERNAMES = 'test1,test2';
process.env.PMA_CONFIG_FILE = __dirname + '/../.gitignore';
const data = require('@src/data');
const comments = require('@src/comments');
const expect = require('chai').expect;

module.exports = function() {
    suite('data', function() {
        test('test destination emails', function(done) {
            expect(data.destinationEmails).to.be.an('array');
            done();
        });
        test('test allowed usernames', function(done) {
            expect(data.allowedUsernames).to.be.an('array');
            expect(data.allowedUsernames).to.deep.equal(['test1', 'test2']);
            done();
        });
        test('test random string', function(done) {
            expect(data.randomString(30)).to.be.a('string');
            done();
        });
        test('test compiledPhpMyAdminConfig string', function(done) {
            expect(data.compiledPhpMyAdminConfig).to.be.a('string');
            done();
        });
        test('test get meta data from pending comment dataset-1', function(done) {
            expect(data.getMetaDataFromMessage(comments.getPendingComment(132654987, 'deploy/master', 'af1254cdfa'))).to.deep.equal({
                "commentId": 132654987,
                "ref": "deploy/master",
                "sha": "af1254cdfa",
            });
            done();
        });
        test('test get meta data from empty value dataset-2', function(done) {
            expect(data.getMetaDataFromMessage(null)).to.equal(null);
            done();
        });
        test('test get meta data from empty value dataset-3', function(done) {
            expect(data.getMetaDataFromMessage("")).to.equal(null);
            done();
        });
        test('test get meta data from invalid JSON dataset-4', function(done) {
            expect(data.getMetaDataFromMessage('<!--\nsudobot:{"commentId":132654987 "ref":"deploy/master","sha":"af1254cdfa"}-->')).to.equal(null);
            done();
        });
        test('test get data config dataset-1', function(done) {
            expect(data.getDataFromConfig("```php<?php echo 'ok';```")).to.equal("<?php echo 'ok';");
            done();
        });
        test('test get data config dataset-2', function(done) {
            expect(data.getDataFromConfig("```<?php echo 'ok';```")).to.equal("<?php echo 'ok';");
            done();
        });
        test('test get data config dataset-3', function(done) {
            expect(data.getDataFromConfig("```\nphp<?php echo 'ok';```")).to.equal("\nphp<?php echo 'ok';");
            done();
        });
        test('test replace emoji', function(done) {
            expect(data.replaceEmoji('❤️')).to.equal(':heart:');
            done();
        });
        test('test protect config', function(done) {
            expect(data.protectConfig('❤️')).to.equal('4p2k77iP');
            done();
        });
        test('test replace tokens in a string', function(done) {
            expect(
                data.replaceTokens(
                    {
                        key: 'Avalue',
                        customKey: 123654,
                        a_key: '*-+36',
                    },
                    'Test {{key}} {{customKey}} {{a_key}} !'
                )
            ).to.equal('Test Avalue 123654 *-+36 !');
            done();
        });
        test('test get data from message dataset-1', function(done) {
            expect(data.getDataFromMessage('@williamdes in #30: Hey hello @sudo-bot !')).to.deep.equal({
                message: 'Hey hello @sudo-bot !',
                prId: 30,
                user: 'williamdes',
            });
            done();
        });
        test('test get data from message dataset-2', function(done) {
            expect(data.getDataFromMessage('@sudo-bot in #25566: :)')).to.deep.equal({
                message: ':)',
                prId: 25566,
                user: 'sudo-bot',
            });
            done();
        });
        test('test get data from message dataset-3', function(done) {
            expect(data.getDataFromMessage('')).to.deep.equal(null);
            done();
        });
        test('test get data from message dataset-4', function(done) {
            expect(data.getDataFromMessage('@ano-nymous in #25566:')).to.deep.equal(null);
            done();
        });
        test('test get data from message dataset-5', function(done) {
            expect(data.getDataFromMessage('@ano-nymous in #25566: ')).to.deep.equal({
                message: '',
                prId: 25566,
                user: 'ano-nymous',
            });
            done();
        });
        test('test get data from message dataset-6', function(done) {
            expect(data.getDataFromMessage('@ano-nymous in #25566: a')).to.deep.equal({
                message: 'a',
                prId: 25566,
                user: 'ano-nymous',
            });
            done();
        });
        test('test get data from message dataset-7', function(done) {
            expect(data.getDataFromMessage('@ano-nymous in #25566: abcd')).to.deep.equal({
                message: 'abcd',
                prId: 25566,
                user: 'ano-nymous',
            });
            done();
        });
        test('test get data from message dataset-8', function(done) {
            expect(data.getDataFromMessage('@ano-nymous in #25566:  ')).to.deep.equal({
                message: ' ',
                prId: 25566,
                user: 'ano-nymous',
            });
            done();
        });
        test('test get data from message dataset-9 (multiline)', function(done) {
            expect(data.getDataFromMessage('@sudo-bot in #132654987: Hey\nHello!\nBye.')).to.deep.equal({
                message: 'Hey\nHello!\nBye.',
                prId: 132654987,
                user: 'sudo-bot',
            });
            done();
        });
        test('test get data from message dataset-10 (multiline+meta)', function(done) {
            expect(
                data.getDataFromMessage(
                    '@sudo-bot in #132654987: <!--\n sudobot:{"commentId":"467644871","ref":"stable-unstable","sha":"c4309612dd34419318d3ba23e74f363512613ca4"}\n -->\nDeploying: `stable-unstable` commit: `c4309612dd34419318d3ba23e74f363512613ca4`\n\n---\n_This message will be updated with the progress of the deploy_\n'
                )
            ).to.deep.equal({
                message:
                    '<!--\n sudobot:{"commentId":"467644871","ref":"stable-unstable","sha":"c4309612dd34419318d3ba23e74f363512613ca4"}\n -->\nDeploying: `stable-unstable` commit: `c4309612dd34419318d3ba23e74f363512613ca4`\n\n---\n_This message will be updated with the progress of the deploy_\n',
                prId: 132654987,
                user: 'sudo-bot',
            });
            done();
        });
        test('test get data from message dataset-11', function(done) {
            expect(data.getDataFromMessage('@ano-nymous in #25566: @sudo-bot Deploy this PR')).to.deep.equal({
                message: '@sudo-bot Deploy this PR',
                prId: 25566,
                user: 'ano-nymous',
            });
            done();
        });
    });
};
