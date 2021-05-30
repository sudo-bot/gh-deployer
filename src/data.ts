'use strict';

const emoji = require('node-emoji');
import { simpleParser, ParsedMail, Source } from 'mailparser';
import { readFileSync } from 'fs';

//const regexBoundary = /Content-Type: [\/a-z;\s]+boundary="(?<boundary>[=\-_a-z0-9]+)"/gm;
//Content-Type: [\/a-z;\s]+boundary="(?<boundary>[=\-_a-z0-9]+)"(([.\S\s]*?)--\k<boundary>)*
//^[\/a-z;\s\S]+boundary="(?<boundary>[=\-_a-z0-9]+)"(([\S\s]*?)(\k<boundary>))*--$
//^[\/a-z;\s\S]+boundary="(?<boundary>[=\-_a-z0-9]+)".*?(?<=\k<boundary>)(?<data>.*)(?=--\k<boundary>)
//<script(?:.*?)?>(.*)?<\/script>

//const extractAllScripts = /(?:<script)(?:.*?)?>([\S\s]+?)?(?:<\/script>)/gmi;

const regexConfigBlock = /(?:```)(?:php){0,1}(?<config>.*?)(?=```)```/gis; // jshint ignore:line

const destinationEmails = ['hooks@mail.hooks.wdes.eu'];

/**
 * @see https://gist.github.com/6174/6062387
 * @param {number} length Number of chars
 */
const randomString = function (length: number) {
    let radom13chars = function () {
        return Math.random().toString(16).substring(2, 15);
    };
    let loops = Math.ceil(length / 13);
    return new Array(loops)
        .fill(radom13chars)
        .reduce((string, func) => {
            return string + func();
        }, '')
        .substring(0, length);
};

const compiledPhpMyAdminConfig: string | null =
    typeof process.env.PMA_CONFIG_FILE === 'string'
        ? readFileSync(process.env.PMA_CONFIG_FILE, {
              encoding: 'base64',
          })
        : null;

/**
 * Get data from message
 */
const getDataFromMessage = function (
    snippetsMsg: string
): {
    message: string;
    user: string;
} | null {
    const regexMessage = /^@(?<user>[a-z0-9_-]+) in #[0-9]+: (?<message>.*?)$/is; // jshint ignore:line
    let message = regexMessage.exec(snippetsMsg);
    if (message != null && message.groups !== undefined) {
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
 */
const getDataFromConfig = function (snippetsMsg: string): string | null {
    const regexConfig = /(?:```)(?:php){0,1}(?<config>.*?)(?=```)```/gis; // jshint ignore:line
    let message = regexConfig.exec(snippetsMsg);
    if (message != null && message.groups !== undefined) {
        return message.groups.config;
    } else {
        return null;
    }
};

const parseReplyToRepoName = function (emailTo: string): string {
    const parts = emailTo.split(' ');
    return parts[0];
};

const parseCommentId = function (emailTextData: string): number | null {
    const regexCommentId = /#issuecomment-(?<commentId>[0-9]+)/gm;
    let message = regexCommentId.exec(emailTextData);
    if (message != null && message.groups !== undefined) {
        return parseInt(message.groups.commentId);
    } else {
        return null;
    }
};

const parsePrId = function (emailTextData: string): number | null {
    const regexPrId = /\/(?<prID>[0-9]+)#issuecomment-[0-9]+$/gm;
    let message = regexPrId.exec(emailTextData);
    if (message != null && message.groups !== undefined) {
        return parseInt(message.groups.prID);
    } else {
        return null;
    }
};

const parseMessage = function (emailText: string): string {
    const emailParts = emailText.split('--\n        You are receiving');
    return emailParts[0].trim();
};

export interface emailData {
    commentId: number | null;
    requestedByUser: string;
    message: string;
    prId: number | null;
    repoName: string;
}

const getDataFromParsedEmail = function (
    parsed: ParsedMail,
    success: (data: emailData) => void,
    error: (err: Error | null) => void
) {
    const senderHeader = parsed.headers.get('x-github-sender');
    let username: string = senderHeader !== undefined ? senderHeader.toString() : '';
    let replyTo = parsed.replyTo;
    success({
        commentId: parseCommentId(parsed.text || ''),
        requestedByUser: username,
        message: parseMessage(parsed.text || ''),
        prId: parsePrId(parsed.text || ''),
        repoName: parseReplyToRepoName(replyTo !== undefined ? replyTo.text : (parsed.to || { text: '' }).text),
    });
};

const getMetaDataFromMessage = function (metaData: string): object | null {
    const regexMetaData = /<!--\nsudobot:(?<metadata>.*)?-->/is; // jshint ignore:line
    let message = regexMetaData.exec(metaData);
    if (message != null && message.groups !== undefined) {
        try {
            return JSON.parse(message.groups.metadata.trim());
        } catch (error) {
            return null;
        }
    } else {
        return null;
    }
};

export default {
    compiledPhpMyAdminConfig: compiledPhpMyAdminConfig,
    destinationEmails: destinationEmails,
    parseMessage: parseMessage,
    getDataFromMessage: getDataFromMessage,
    parseReplyToRepoName: parseReplyToRepoName,
    parseCommentId: parseCommentId,
    parsePrId: parsePrId,
    getMetaDataFromMessage: getMetaDataFromMessage,
    randomString: randomString,
    regexConfigBlock: regexConfigBlock,
    getDataFromConfig: getDataFromConfig,
    replaceEmoji: (text: string) => {
        return emoji.replace(text, (emojiReplacement: { key: string }) => `:${emojiReplacement.key}:`);
    },
    protectConfig: (config: string) => Buffer.from(config).toString('base64'),
    parseEmail: (stream: Source) => {
        return new Promise((resolve: (data: emailData) => void, reject) => {
            simpleParser(stream)
                .then((parsed) => {
                    getDataFromParsedEmail(parsed, resolve, reject);
                })
                .catch(reject);
        });
    },
    getDataFromParsedEmail: getDataFromParsedEmail,
    replaceTokens: (
        tokens: {
            [key: string]: string | number;
        },
        stringToReplace: string
    ) => {
        Object.keys(tokens).forEach(function (key: string) {
            var val = tokens[key];
            stringToReplace = stringToReplace.replace(new RegExp('\\{\\{' + key + '\\}\\}', 'g'), val + '');
        });
        return stringToReplace;
    },
};
