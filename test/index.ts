'use strict';

process.env.TZ = 'UTC';
require('module-alias/register');
import data from '@test/data';
import docker from '@test/docker';
import commands from '@test/commands';

suite('Sudo Bot', function() {
    data();
    docker();
    commands();
}).beforeAll('Load ENV', done => {
    require('dotenv').config({ path: __dirname + '/../.env' });
    done();
});
