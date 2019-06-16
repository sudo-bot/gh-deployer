'use strict';

import github, { reactions } from '@src/github';
import logger from '@src/logger';
import docker from '@src/docker';
import dns from '@src/dns';
import comments from '@src/comments';
import data, { emailData } from '@src/data';
import Message, { MessagePlatform } from './modeles/Message';

export default {
    deploy: (emailInfos: emailData, configBlock: string) => {
        if (emailInfos.prId === null || emailInfos.commentId === null) {
            logger.error('Missing data !', emailInfos);
            return;
        }
        github
            .getPrInfos(emailInfos.prId || 0, emailInfos.repoName)
            .then(prInfos => {
                github
                    .createComment(
                        emailInfos.prId || 0,
                        prInfos.data.base.repo.full_name,
                        comments.getPendingComment(
                            emailInfos.commentId || 0,
                            prInfos.data.head.ref,
                            prInfos.data.head.sha
                        )
                    )
                    .then(deployComment => {
                        if (emailInfos.commentId !== null && emailInfos.prId !== null) {
                            const msg = new Message(
                                deployComment.data.id,
                                emailInfos.prId,
                                MessagePlatform.github,
                                true,
                                emailInfos.commentId
                            );
                            msg.save();
                        }
                        docker
                            .createDocker(
                                emailInfos.prId || 0,
                                prInfos.data.head.repo.clone_url,
                                prInfos.data.head.ref,
                                prInfos.data.head.sha,
                                configBlock,
                                data.randomString(80)
                            )
                            .then(docker => {
                                dns.publishDnsRecord(
                                    docker.containerName,
                                    emailInfos.prId || 0,
                                    prInfos.data.head.ref,
                                    prInfos.data.head.sha
                                )
                                    .then(domain => {
                                        logger.info('Published-domain:', domain);
                                        github.addReaction(
                                            emailInfos.commentId || 0,
                                            emailInfos.repoName,
                                            reactions.ROCKET
                                        );
                                        github
                                            .updateComment(
                                                emailInfos.prId || 0,
                                                prInfos.data.base.repo.full_name,
                                                deployComment.data.id,
                                                comments.getDeployedComment(
                                                    emailInfos.commentId || 0,
                                                    prInfos.data.head.ref,
                                                    prInfos.data.head.sha,
                                                    docker.containerName,
                                                    domain
                                                )
                                            )
                                            .then(() => {
                                                logger.info('Updated comment:#' + deployComment.data.id);
                                            })
                                            .catch((error: Error) => logger.error(error));
                                    })
                                    .catch((error: Error) => logger.error(error, emailInfos));
                            })
                            .catch((error: Error) => logger.error(error, prInfos, emailInfos));
                    })
                    .catch((error: Error) => logger.error(error, prInfos, emailInfos));
            })
            .catch((error: Error) => logger.error(error, emailInfos));
    },
};
