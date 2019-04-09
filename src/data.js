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

const regexInboxMarkup = /<script type="application\/json" data-scope="inboxmarkup">(?<jsonld>[\S\s]+?)?<\/script>/im;

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
    const regexMessage = /^@(?<user>[a-z0-9_-]+) in #(?<prId>[0-9]+): (?<message>.*?)$/is; // jshint ignore:line
    let message = regexMessage.exec(snippetsMsg);
    if (message != null) {
        return {
            message: message.groups.message,
            prId: parseInt(message.groups.prId),
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

const getDataFromParsedEmail = function(parsed, success, error) {
    let matchs = regexInboxMarkup.exec(parsed.html);
    /*
        {
            "api_version":"1.0",
            "publisher":{
                "api_key": "05dde50f1d1a384dd78767c55493e4bb",
                "name": "GitHub"
            },
            "entity":{
                "external_key":"github/williamdes/mariadb-mysql-kbs",
                "title":"williamdes/mariadb-mysql-kbs",
                "subtitle":"GitHub repository",
                "main_image_url":"https://github.githubassets.com/images/email/message_cards/header.png",
                "avatar_image_url":"https://github.githubassets.com/images/email/message_cards/avatar.png",
                "action":{
                    "name":"Open in GitHub",
                    "url":"https://github.com/williamdes/mariadb-mysql-kbs"
                }
            },
            "updates":{
                "snippets":[{"icon":"PERSON","message":"@williamdes in #30: @sudo-bot /deploy"}],"action":{
                    "name":"View Pull Request",
                    "url":"https://github.com/williamdes/mariadb-mysql-kbs/pull/30#issuecomment-466782813"
                }
            }
        }
        */
    if (matchs && matchs.groups && matchs.groups.jsonld) {
        let metadata = JSON.parse(matchs.groups.jsonld);

        let snippetsMsg = metadata.updates.snippets[0].message;
        let message = getDataFromMessage(snippetsMsg);
        if (message !== null && allowedUsernames.includes(message.user)) {
            // message : { user: 'williamdes', prID: '30', message: '@sudo-bot :)' }
            let commentLastIndex = metadata.updates.action.url.lastIndexOf('-');
            const commentId = metadata.updates.action.url.slice(commentLastIndex + 1);
            success({
                commentId: commentId,
                requestedByUser: message.user,
                message: message.message,
                prId: message.prId,
                repoName: metadata.entity.title,
            });
        } else {
            logger.info('Not allowed:', message !== null ? message.user : 'Anonymous ?');
        }
    } else {
        logger.error('Error: ', parsed.text, parsed.textAsHtml, parsed.html, matchs);
        error(parsed.text);
    }
};

module.exports = {
    compiledPhpMyAdminConfig: compiledPhpMyAdminConfig,
    destinationEmails: destinationEmails,
    allowedUsernames: allowedUsernames,
    getDataFromMessage: getDataFromMessage,
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
