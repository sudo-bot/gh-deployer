'use strict';

const logger = require('@src/logger');
const emoji = require('node-emoji');
const simpleMailParser = require('mailparser').simpleParser;
const fs = require('fs');

//const regexBoundary = /Content-Type: [\/a-z;\s]+boundary="(?<boundary>[=\-_a-z0-9]+)"/gm;
//Content-Type: [\/a-z;\s]+boundary="(?<boundary>[=\-_a-z0-9]+)"(([.\S\s]*?)--\k<boundary>)*
//^[\/a-z;\s\S]+boundary="(?<boundary>[=\-_a-z0-9]+)"(([\S\s]*?)(\k<boundary>))*--$
//^[\/a-z;\s\S]+boundary="(?<boundary>[=\-_a-z0-9]+)".*?(?<=\k<boundary>)(?<data>.*)(?=--\k<boundary>)
//<script(?:.*?)?>(.*)?<\/script>

//const extractAllScripts = /(?:<script)(?:.*?)?>([\S\s]+?)?(?:<\/script>)/gmi;

const regexConfigBlock = /(?:```)(?:php){0,1}(?<config>.*?)(?=```)```/gis; // jshint ignore:line

const destinationEmails = ['hooks@mail.hooks.wdes.eu'];

const allowedHostnames = [/^out-[1-9]{1,2}\.smtp\.github\.com$/];

const allowedUsernames = process.env.ALLOWED_USERNAMES.split(',');

logger.info('Allowed users:', allowedUsernames);

/**
 * @see https://gist.github.com/6174/6062387
 * @param {Number} length Number of chars
 */
const randomString = function(length) {
    let radom13chars = function() {
        return Math.random()
            .toString(16)
            .substring(2, 15);
    };
    let loops = Math.ceil(length / 13);
    return new Array(loops)
        .fill(radom13chars)
        .reduce((string, func) => {
            return string + func();
        }, '')
        .substring(0, length);
};

const compiledPhpMyAdminConfig = fs.readFileSync(process.env.PMA_CONFIG_FILE, {
    encoding: 'base64',
});

/**
 * Get data from message
 * @param {String} snippetsMsg
 * @return {Object}
 */
const getDataFromMessage = function(snippetsMsg) {
    const regexMessage = /^@(?<user>[a-z0-9_-]+) in #[0-9]+: (?<message>.*?)$/is; // jshint ignore:line
    let message = regexMessage.exec(snippetsMsg);
    if (message != null) {
        return {
            message: message.groups.message,
            user: message.groups.user,
        };
    } else {
        return null;
    }
};

/**
 * Get data from config
 * @param {String} snippetsMsg
 * @return {Object}
 */
const getDataFromConfig = function(snippetsMsg) {
    const regexConfig = /(?:```)(?:php){0,1}(?<config>.*?)(?=```)```/gis; // jshint ignore:line
    let message = regexConfig.exec(snippetsMsg);
    if (message != null) {
        return message.groups.config;
    } else {
        return null;
    }
};

const parseReplyToRepoName = function(emailTo) {
    const parts = emailTo.split(' ');
    return parts[0];
};

const parseCommentId = function(emailTextData) {
    const regexCommentId = /#issuecomment-(?<commentId>[0-9]+)/gm;
    let message = regexCommentId.exec(emailTextData);
    if (message != null) {
        return parseInt(message.groups.commentId);
    } else {
        return null;
    }
};

const parsePrId = function(emailTextData) {
    const regexPrId = /\/(?<prID>[0-9]+)#issuecomment-[0-9]+$/gm;
    let message = regexPrId.exec(emailTextData);
    if (message != null) {
        return parseInt(message.groups.prID);
    } else {
        return null;
    }
};

const parseMessage = function(emailText) {
    const emailParts = emailText.split('--\n        You are receiving');
    return emailParts[0].trim();
};

const getDataFromParsedEmail = function(parsed, success, error) {
    let username = parsed.headers.get('x-github-sender');
    if (allowedUsernames.includes(username)) {
        // message : { user: 'williamdes', prID: '30', message: '@sudo-bot :)' }
        success({
            commentId: parseCommentId(parsed.text),
            requestedByUser: username,
            message: parseMessage(parsed.text),
            prId: parsePrId(parsed.text),
            repoName: parseReplyToRepoName(parsed.replyTo.text || parsed.to.text),
        });
    } else {
        logger.info('Not allowed:', username);
    }
};

const getMetaDataFromMessage = function(metaData) {
    const regexMetaData = /<!--\nsudobot:(?<metadata>.*)?-->/is; // jshint ignore:line
    let message = regexMetaData.exec(metaData);
    if (message != null) {
        try {
            return JSON.parse(message.groups.metadata.trim());
        } catch (error) {
            return null;
        }
    } else {
        return null;
    }
};

module.exports = {
    compiledPhpMyAdminConfig: compiledPhpMyAdminConfig,
    destinationEmails: destinationEmails,
    allowedUsernames: allowedUsernames,
    parseMessage: parseMessage,
    getDataFromMessage: getDataFromMessage,
    parseReplyToRepoName: parseReplyToRepoName,
    parseCommentId: parseCommentId,
    parsePrId: parsePrId,
    getMetaDataFromMessage: getMetaDataFromMessage,
    randomString: randomString,
    regexConfigBlock: regexConfigBlock,
    getDataFromConfig: getDataFromConfig,
    replaceEmoji: text => {
        return emoji.replace(text, emoji => `:${emoji.key}:`);
    },
    protectConfig: config => Buffer.from(config).toString('base64'),
    parseEmail: stream => {
        return new Promise((resolve, reject) => {
            simpleMailParser(stream)
                .then(parsed => {
                    getDataFromParsedEmail(parsed, resolve, reject);
                })
                .catch(reject);
        });
    },
    getDataFromParsedEmail: getDataFromParsedEmail,
    replaceTokens: (tokens, stringToReplace) => {
        Object.keys(tokens).forEach(function(key) {
            var val = tokens[key];
            stringToReplace = stringToReplace.replace(new RegExp('\\{\\{' + key + '\\}\\}', 'g'), val);
        });
        return stringToReplace;
    },
};
