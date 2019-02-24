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
    });
};
