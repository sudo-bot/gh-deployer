'use strict';

import { configure, getLogger } from 'log4js';

configure({
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

export default getLogger();
