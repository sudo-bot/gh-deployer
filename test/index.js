'use strict';

process.env.TZ = 'UTC';
require('module-alias/register');
const data = require('@test/data');
const commands = require('@test/commands');

suite('Sudo Bot', function() {
    data();
    commands();
}).beforeAll('Load ENV', done => {
    require('dotenv').config({ path: __dirname + '/../.env' });
    done();
});
