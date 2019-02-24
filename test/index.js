'use strict';

process.env.TZ = 'UTC';
require('module-alias/register');
const data = require('@test/data');

suite('Sudo Bot', function() {
    data();
}).beforeAll('Load ENV', done => {
    require('dotenv').config({ path: __dirname + '/../.env' });
    done();
});
