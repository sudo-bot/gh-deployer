'use strict';

require('module-alias/register');
const data = require('@src/data');
const expect = require('chai').expect;

module.exports = function() {
    suite('data', function() {
        test('test destination emails', function(done) {
            expect(data.destinationEmails).to.be.an('array');
            done();
        });
        test('test get data from message dataset-1', function(done) {
            expect(data.getDataFromMessage('@williamdes in #30: Hey hello @sudo-bot !')).to.deep.equal({
                message: 'Hey hello @sudo-bot !',
                prId: 30,
                user: "williamdes"
            });
            done();
        });
        test('test get data from message dataset-2', function(done) {
            expect(data.getDataFromMessage('@sudo-bot in #25566: :)')).to.deep.equal({
                message: ':)',
                prId: 25566,
                user: "sudo-bot"
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
                user: "ano-nymous"
            });
            done();
        });
        test('test get data from message dataset-6', function(done) {
            expect(data.getDataFromMessage('@ano-nymous in #25566: a')).to.deep.equal({
                message: 'a',
                prId: 25566,
                user: "ano-nymous"
            });
            done();
        });
        test('test get data from message dataset-7', function(done) {
            expect(data.getDataFromMessage('@ano-nymous in #25566: abcd')).to.deep.equal({
                message: 'abcd',
                prId: 25566,
                user: "ano-nymous"
            });
            done();
        });
        test('test get data from message dataset-8', function(done) {
            expect(data.getDataFromMessage('@ano-nymous in #25566:  ')).to.deep.equal({
                message: ' ',
                prId: 25566,
                user: "ano-nymous"
            });
            done();
        });
        test('test get data from message dataset-9 (multiline)', function(done) {
            expect(data.getDataFromMessage(
                "@sudo-bot in #132654987: Hey\nHello!\nBye.")).to.deep.equal({
                message: 'Hey\nHello!\nBye.',
                prId: 132654987,
                user: "sudo-bot"
            });
            done();
        });
        test('test get data from message dataset-10 (multiline+meta)', function(done) {
            expect(data.getDataFromMessage(
                "@sudo-bot in #132654987: <!--\n sudobot:{\"commentId\":\"467644871\",\"ref\":\"stable-unstable\",\"sha\":\"c4309612dd34419318d3ba23e74f363512613ca4\"}\n -->\nDeploying: `stable-unstable` commit: `c4309612dd34419318d3ba23e74f363512613ca4`\n\n---\n_This message will be updated with the progress of the deploy_\n")).to.deep.equal({
                message: '<!--\n sudobot:{\"commentId\":\"467644871\",\"ref\":\"stable-unstable\",\"sha\":\"c4309612dd34419318d3ba23e74f363512613ca4\"}\n -->\nDeploying: `stable-unstable` commit: `c4309612dd34419318d3ba23e74f363512613ca4`\n\n---\n_This message will be updated with the progress of the deploy_\n',
                prId: 132654987,
                user: "sudo-bot"
            });
            done();
        });
    });
};
