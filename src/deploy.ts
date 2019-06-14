'use strict';

import github from '@src/github';
import logger from '@src/logger';
import docker from '@src/docker';
import dns from '@src/dns';
import comments from '@src/comments';
import data, { emailData } from '@src/data';

export default {
    deploy: (emailInfos: emailData, configBlock: string) => {
        if (emailInfos.prId === null || emailInfos.commentId === null) {
            logger.error('Missing data !', emailInfos);
            return;
        }
        github
            .getPrInfos(emailInfos.prId || 0, emailInfos.repoName)
            .then((prInfos: any) => {
                github
                    .createComment(
                        emailInfos.prId || 0,
                        prInfos.base.repo.full_name,
                        comments.getPendingComment(emailInfos.commentId || 0, prInfos.head.ref, prInfos.head.sha)
                    )
                    .then((deployComment: any) => {
                        docker
                            .createDocker(
                                emailInfos.prId || 0,
                                prInfos.head.repo.clone_url,
                                prInfos.head.ref,
                                prInfos.head.sha,
                                configBlock,
                                data.randomString(80)
                            )
                            .then((docker: any) => {
                                dns.publishDnsRecord(
                                    docker.containerName,
                                    emailInfos.prId || 0,
                                    prInfos.head.ref,
                                    prInfos.head.sha
                                )
                                    .then(domain => {
                                        logger.info('Published-domain:', domain);
                                        github
                                            .updateComment(
                                                emailInfos.prId || 0,
                                                prInfos.base.repo.full_name,
                                                deployComment.id,
                                                comments.getDeployedComment(
                                                    emailInfos.commentId || 0,
                                                    prInfos.head.ref,
                                                    prInfos.head.sha,
                                                    docker.containerName,
                                                    domain
                                                )
                                            )
                                            .then(() => {
                                                logger.info('Updated comment:#' + deployComment.id);
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
