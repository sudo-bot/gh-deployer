'use strict';

const Sentry = require('@sentry/node');
Sentry.init({ dsn: process.env.SENTRY_DSN });

/**
 * The appender function.
 *
 * @param {String} level The log level to use as an override for the main category level.
 *
 * @return {Function} Returns the
 */
function sentryAppender(level) {
    return logEvent => {
        let msg = logEvent.data[0];
        const contexts = [];
        logEvent.data.slice(1).forEach(arg => {
            if (arg instanceof Error) {
                contexts.push(arg.toString());
            } else {
                contexts.push(arg);
            }
        });
        // Check if the log level is enabled
        if (!level || logEvent.level.isGreaterThanOrEqualTo(level)) {
            Sentry.withScope(scope => {
                let level = logEvent.level.toString().toLowerCase();
                level = level.replace('warn', 'warning');
                scope.setLevel(level);
                Sentry.captureEvent({
                    message: msg,
                    level: Sentry.Severity.fromString(level),
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
 * @param  {Object} config The options to apply.
 *
 * @return {Function} Returns the response from the sentryAppender() function.
 */
function configure(config) {
    return sentryAppender(config.level);
}

exports.appender = sentryAppender;
exports.configure = configure;
