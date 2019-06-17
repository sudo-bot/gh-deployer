'use strict';

process.env.TZ = 'UTC';
require('module-alias/register');

import Knex from '@src/knex';
import users from '@test/users';
import messages from '@test/messages';
import data from '@test/data';
import docker from '@test/docker';
import commands from '@test/commands';
import containers from '@test/containers';
import domains from '@test/domains';

suite('Sudo Bot', function() {
    data();
    docker();
    commands();
    users();
    messages();
    containers();
    domains();
})
    .beforeAll('Load ENV', done => {
        require('dotenv').config({ path: __dirname + '/../.env' });
        done();
    })
    .afterAll('Close database', done => {
        Knex.stop();
        done();
    });
