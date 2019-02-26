'use strict';

const simpleMailParser = require('mailparser').simpleParser;

//const regexBoundary = /Content-Type: [\/a-z;\s]+boundary="(?<boundary>[=\-_a-z0-9]+)"/gm;
//Content-Type: [\/a-z;\s]+boundary="(?<boundary>[=\-_a-z0-9]+)"(([.\S\s]*?)--\k<boundary>)*
//^[\/a-z;\s\S]+boundary="(?<boundary>[=\-_a-z0-9]+)"(([\S\s]*?)(\k<boundary>))*--$
//^[\/a-z;\s\S]+boundary="(?<boundary>[=\-_a-z0-9]+)".*?(?<=\k<boundary>)(?<data>.*)(?=--\k<boundary>)
//<script(?:.*?)?>(.*)?<\/script>

//const extractAllScripts = /(?:<script)(?:.*?)?>([\S\s]+?)?(?:<\/script>)/gmi;

const regexInboxMarkup = /<script type="application\/json" data-scope="inboxmarkup">(?<jsonld>[\S\s]+?)?<\/script>/im;

const regexMessage = /^@(?<user>[a-z0-9_-]+) in #(?<prID>[0-9]+): (?<message>.*?)$/i;

const destinationEmails = ['hooks@mail.hooks.wdes.eu'];

const allowedHostnames = [/^out-[1-9]{1,2}\.smtp\.github\.com$/];

const allowedUsernames = ['williamdes', 'sudo-bot'];

const compiledPhpMyAdminConfig = Buffer.from(
    `<?php
declare(strict_types=1);
$i = 0;
$i++;
$cfg['Servers'][$i]['auth_type'] = 'cookie';
$cfg['Servers'][$i]['host'] = 'mariadb1.phpmyadmin.local';
$cfg['Servers'][$i]['compress'] = false;
$cfg['Servers'][$i]['AllowNoPassword'] = true;
$i++;
$cfg['Servers'][$i]['auth_type'] = 'cookie';
$cfg['Servers'][$i]['host'] = 'mysql1.phpmyadmin.local';
$cfg['Servers'][$i]['compress'] = false;
$cfg['Servers'][$i]['AllowNoPassword'] = true;
`
).toString('base64');

module.exports = {
    compiledPhpMyAdminConfig: compiledPhpMyAdminConfig,
    destinationEmails: destinationEmails,
    parseEmail: stream => {
        return new Promise((resolve, reject) => {
            simpleMailParser(stream)
                .then(parsed => {
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
                        let message = regexMessage.exec(snippetsMsg);
                        if (
                            message &&
                            message.groups &&
                            allowedUsernames.includes(message.groups.user)
                        ) {
                            //var ghissue = GHclient.issue(metadata.entity.title, 37);
                            // message : { user: 'williamdes', prID: '30', message: '@sudo-bot :)' }
                            if (message.groups.user != 'sudo-bot') {
                                let commentLastIndex = metadata.updates.action.url.lastIndexOf(
                                    '-'
                                );
                                const commentId = metadata.updates.action.url.slice(
                                    commentLastIndex + 1
                                );
                                resolve({
                                    commentId: commentId,
                                    requestedByUser: message.groups.user,
                                    prId: message.groups.prID,
                                    repoName: metadata.entity.title,
                                });
                            } else {
                                console.log('From-me:', message.groups);
                            }
                        } else {
                            console.log(
                                'Not allowed:' +
                                    (message !== null && message.groups && message.groups.user)
                                    ? message.groups.user
                                    : message
                            );
                        }
                    } else {
                        console.log(
                            'Error: ',
                            parsed.text,
                            parsed.textAsHtml,
                            parsed.html,
                            matchs
                        );
                    }
                })
                .catch(reject);
        });
    },
    replaceTokens: (tokens, stringToReplace) => {
        Object.keys(tokens).forEach(function(key) {
            var val = tokens[key];
            stringToReplace = stringToReplace.replace(
                new RegExp('\\{\\{' + key + '\\}\\}', 'g'),
                val
            );
        });
        return stringToReplace;
    },
};
