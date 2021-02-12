#!/usr/bin/env node
const moduleAlias = require('module-alias');
moduleAlias.addAliases({
    '@src': __dirname + '/../dist',
});

moduleAlias();

require('@sudo-bot/gh-deployer');
