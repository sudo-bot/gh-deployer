'use strict';

process.env.TZ = 'UTC';
require('module-alias/register');

import Knex from '@src/knex';
import users from '@test/users';
import messages from '@test/messages';
import data from '@test/data';
import docker from '@test/docker';
import commands from '@test/commands';

suite('Sudo Bot', function() {
    data();
    docker();
    commands();
    users();
    messages();
})
    .beforeAll('Load ENV', done => {
        require('dotenv').config({ path: __dirname + '/../.env' });
        done();
    })
    .afterAll('Close database', done => {
        Knex.stop();
        done();
    });
