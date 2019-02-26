'use strict';

process.env.TZ = 'UTC';
require('dotenv').config({ path: __dirname + '/.env' });
require('module-alias/register');

const docker = require('@src/docker');
const github = require('@src/github');
const data = require('@src/data');
const smtp = require('@src/smtp');

smtp.smtpServer((stream, callback) => {
    data.parseEmail(stream)
        .then(emailInfos => {
            callback();
            github
                .getPrInfos(emailInfos.prId, emailInfos.repoName)
                .then(prInfos => {
                    github
                        .createComment(
                            prInfos.id,
                            prInfos.head.repo.full_name,
                            emailInfos.commentId,
                            prInfos.head.ref,
                            prInfos.head.sha
                        )
                        .catch(error => console.log(error, prInfos, emailInfos));
                    return prInfos;
                })
                .then(prInfos =>
                    docker
                        .createDocker(
                            prInfos.id,
                            prInfos.head.repo.clone_url,
                            prInfos.head.ref,
                            prInfos.head.sha,
                            data.compiledPhpMyAdminConfig
                        )
                        .catch(error => console.log(error, prInfos, emailInfos))
                )
                .catch(error => console.log(error, emailInfos));
        })
        .catch(error => console.log(error));
})
    .then(smtpServer => {
        smtpServer.listen(25, '0.0.0.0', () => {
            console.log('Listening...');
        });
    })
    .catch(error => console.log(error));
