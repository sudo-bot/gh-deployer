'use strict';

process.env.TZ = 'UTC';
require('dotenv').config({ path: __dirname + '/.env' });
require('module-alias/register');

const logger = require('@src/logger');
const docker = require('@src/docker');
const github = require('@src/github');
const data = require('@src/data');
const smtp = require('@src/smtp');
const dns = require('@src/dns');
const comments = require('@src/comments');

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
                            prInfos.head.base.full_name,
                            comments.getPendingComment(
                                emailInfos.commentId,
                                prInfos.head.ref,
                                prInfos.head.sha
                            )
                        )
                        .then(deployComment => {
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
                                        emailInfos.prId,
                                        prInfos.head.ref,
                                        prInfos.head.sha
                                    )
                                        .then(domain => {
                                            github.updateComment(
                                                emailInfos.prId,
                                                prInfos.head.repo.full_name,
                                                deployComment.id,
                                                comments.getDeployedComment(
                                                    emailInfos.commentId,
                                                    prInfos.head.ref,
                                                    prInfos.head.sha,
                                                    docker.containerName,
                                                    domain
                                                )
                                            );
                                            logger.info('Published-domain:', domain);
                                        })
                                        .catch(error => logger.error(error, emailInfos));
                                })
                                .catch(error => logger.error(error, prInfos, emailInfos));
                        })
                        .catch(error => logger.error(error, prInfos, emailInfos));
                })
                .catch(error => logger.error(error, emailInfos));
        })
        .catch(error => logger.error(error));
})
    .then(smtpServer => {
        smtpServer.listen(process.env.SMTP_PORT || 25, '0.0.0.0', () => {
            logger.info('Listening...');
        });
    })
    .catch(error => logger.error(error));
