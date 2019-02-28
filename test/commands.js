'use strict';

require('module-alias/register');
const commands = require('@src/commands');
const expect = require('chai').expect;

module.exports = function() {
    suite('commands', function() {
        test('test deploy PR command dataset-1', function(done) {
            expect(commands.getCommand('/deploy PR')).to.equal(commands.COMMANDS.DEPOY_PR);
            done();
        });
        test('test deploy PR command dataset-2', function(done) {
            expect(commands.getCommand('@sudo-bot Deploy this PR')).to.equal(
                commands.COMMANDS.DEPOY_PR
            );
            done();
        });
        test('test random string', function(done) {
            expect(commands.getCommand('I love you')).to.equal(commands.COMMANDS.DO_NOTHING);
            done();
        });
        test('test deploy PR command', function(done) {
            expect(commands.getCommand('/deploy PR')).to.equal(commands.COMMANDS.DEPOY_PR);
            done();
        });
        test('test send creds', function(done) {
            expect(commands.getCommand('send me the credentials for mysql')).to.equal(
                commands.COMMANDS.SEND_CREDS
            );
            done();
        });
        test('test deploy and merge', function(done) {
            expect(commands.getCommand('/deploy and merge master')).to.equal(
                commands.COMMANDS.DEPLOY_AND_MERGE_MASTER
            );
            done();
        });
    });
};
