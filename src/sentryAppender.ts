'use strict';

import { init, withScope, captureEvent, Severity } from '@sentry/node';
import { LoggingEvent, AppenderModule } from 'log4js';
import * as packageJson from '@root/package.json';

init({
    dsn: process.env.SENTRY_DSN,
    release: packageJson.name + '@' + packageJson.version,
    environment: process.env.NODE_ENV,
    serverName: require('os').hostname() || null,
});

/**
 * The appender function.
 *
 * @param {string} level The log level to use as an override for the main category level.
 *
 * @return {Function} The log function
 */
function sentryAppender(level: string): (logEvent: LoggingEvent) => void {
    return (logEvent) => {
        let msg = logEvent.data[0];
        const contexts: string[] = [];
        logEvent.data.slice(1).forEach((arg) => {
            if (arg instanceof Error) {
                contexts.push(arg.toString());
            } else {
                contexts.push(arg);
            }
        });
        // Check if the log level is enabled
        if (!level || logEvent.level.isGreaterThanOrEqualTo(level)) {
            withScope((scope) => {
                let level = logEvent.level.toString().toLowerCase();
                level = level.replace('warn', Severity.Warning);
                scope.setLevel(Severity.fromString(level));
                captureEvent({
                    message: msg,
                    level: Severity.fromString(level),
                    extra: {
                        data: contexts,
                    },
                });
            });
        }
    };
}

/**
 * Configures the appender.
 *
 * @param {object} config The options to apply.
 *
 * @return {Function} Returns the response from the sentryAppender() function.
 */
function configure(config: { level: string }): (logEvent: LoggingEvent) => void {
    return sentryAppender(config.level);
}

const module: AppenderModule = {
    configure: configure,
};

export default module;
