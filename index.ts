'use strict';

process.env.TZ = 'UTC';
require('dotenv').config({ path: __dirname + '/.env' });
require('module-alias/register');

require('@src/index');
