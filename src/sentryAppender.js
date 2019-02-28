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
        // Check if the log level is enabled
        if (!level || logEvent.level.isGreaterThanOrEqualTo(level)) {
            Sentry.withScope(scope => {
                scope.setTag('context', logEvent.context);
                scope.setTag('context', logEvent.context);
                scope.setLevel(logEvent.level.toString().toLowerCase());

                Sentry.captureMessage(logEvent.data.join('|'));
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
