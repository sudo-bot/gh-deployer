'use strict';

const log4js = require('log4js');

log4js.configure({
    appenders: {
        sentry: {
            type: '@src/sentryAppender',
            level: 'warn',
        },
        out: { type: 'stdout' },
    },
    categories: {
        default: { appenders: ['out', 'sentry'], level: 'debug' },
    },
});

const logger = log4js.getLogger();

module.exports = logger;
