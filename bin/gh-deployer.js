#!/usr/bin/env node
const moduleAlias = require('module-alias');
moduleAlias.addAliases({
    '@src': __dirname + '/../dist/src',
    '@utils': __dirname + '/../dist/utils',
    '@root': __dirname + '/../dist',
});

moduleAlias();
require('@sudo-bot/gh-deployer');
