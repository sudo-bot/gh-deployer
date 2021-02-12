'use strict';

import { configure, getLogger } from 'log4js';
import sentryAppender from '@src/sentryAppender';

configure({
    appenders: {
        sentry: {
            type: sentryAppender,
            level: 'warn',
        },
        out: { type: 'stdout' },
    },
    categories: {
        default: { appenders: ['out', 'sentry'], level: 'debug' },
    },
});

export default getLogger();
