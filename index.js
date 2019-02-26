'use strict';

process.env.TZ = 'UTC';
require('dotenv').config({ path: __dirname + '/.env' });
require('module-alias/register');

const docker = require('@src/docker');
const github = require('@src/github');
const data = require('@src/data');
const smtp = require('@src/smtp');
const dns = require('@src/dns');

smtp.smtpServer((stream, callback) => {
    data.parseEmail(stream)
        .then(emailInfos => {
            callback();
            github
                .getPrInfos(emailInfos.prId, emailInfos.repoName)
                .then(prInfos => {
                    github
                        .createComment(
                            emailInfos.prId,
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
                            emailInfos.prId,
                            prInfos.head.repo.clone_url,
                            prInfos.head.ref,
                            prInfos.head.sha,
                            data.compiledPhpMyAdminConfig
                        )
                        .then(docker => {
                            dns.publishDnsRecord(
                                docker.containerName,
                                prInfos.head.ref,
                                prInfos.head.sha
                            )
                                .then(domain => console.log('Published', domain))
                                .catch(error => console.log(error, emailInfos));
                        })
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
