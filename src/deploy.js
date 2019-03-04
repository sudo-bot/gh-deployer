'use strict';

const github = require('@src/github');
const logger = require('@src/logger');
const docker = require('@src/docker');
const dns = require('@src/dns');
const comments = require('@src/comments');
const data = require('@src/data');

module.exports = {
    deploy: (emailInfos, configBlock) => {
        github
            .getPrInfos(emailInfos.prId, emailInfos.repoName)
            .then(prInfos => {
                github
                    .createComment(
                        emailInfos.prId,
                        prInfos.base.repo.full_name,
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
                                configBlock,
                                data.randomString(80)
                            )
                            .then(docker => {
                                dns.publishDnsRecord(
                                    docker.containerName,
                                    emailInfos.prId,
                                    prInfos.head.ref,
                                    prInfos.head.sha
                                )
                                    .then(domain => {
                                        logger.info('Published-domain:', domain);
                                        github
                                            .updateComment(
                                                emailInfos.prId,
                                                prInfos.base.repo.full_name,
                                                deployComment.id,
                                                comments.getDeployedComment(
                                                    emailInfos.commentId,
                                                    prInfos.head.ref,
                                                    prInfos.head.sha,
                                                    docker.containerName,
                                                    domain
                                                )
                                            )
                                            .then(() => {
                                                logger.info(
                                                    'Updated comment:#' + deployComment.id
                                                );
                                            })
                                            .catch(error => logger.error(error));
                                    })
                                    .catch(error => logger.error(error, emailInfos));
                            })
                            .catch(error => logger.error(error, prInfos, emailInfos));
                    })
                    .catch(error => logger.error(error, prInfos, emailInfos));
            })
            .catch(error => logger.error(error, emailInfos));
    },
};
