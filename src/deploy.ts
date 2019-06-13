'use strict';

import github from '@src/github';
import logger from '@src/logger';
import docker from '@src/docker';
import dns from '@src/dns';
import comments from '@src/comments';
import data from '@src/data';

export default {
    deploy: (emailInfos, configBlock) => {
        github
            .getPrInfos(emailInfos.prId, emailInfos.repoName)
            .then((prInfos: any) => {
                github
                    .createComment(
                        emailInfos.prId,
                        prInfos.base.repo.full_name,
                        comments.getPendingComment(emailInfos.commentId, prInfos.head.ref, prInfos.head.sha)
                    )
                    .then((deployComment: any) => {
                        docker
                            .createDocker(
                                emailInfos.prId,
                                prInfos.head.repo.clone_url,
                                prInfos.head.ref,
                                prInfos.head.sha,
                                configBlock,
                                data.randomString(80)
                            )
                            .then((docker: any) => {
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
                                                logger.info('Updated comment:#' + deployComment.id);
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
