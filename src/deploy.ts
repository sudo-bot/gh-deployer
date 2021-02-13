'use strict';

import github, { reactions } from '@src/github';
import logger from '@src/logger';
import docker from '@src/docker';
import dns from '@src/dns';
import comments from '@src/comments';
import data, { emailData } from '@src/data';
import Message, { MessagePlatform } from './modeles/Message';
import messages from '@root/test/messages';

const afterComment = (
    configBlock: string,
    emailInfos: emailData,
    deployCommentId: number,
    prInfos: {
        repoSlug: string;
        cloneUrl: string;
        ref: string;
        sha: string;
    }
) => {
    if (emailInfos.commentId !== null && emailInfos.prId !== null) {
        const msg = new Message(
            emailInfos.requestedByUser,
            deployCommentId,
            emailInfos.prId,
            MessagePlatform.github,
            true,
            emailInfos.commentId
        );
        msg.save();
    }
    docker
        .createDocker(
            emailInfos.repoName,
            emailInfos.prId || 0,
            prInfos.cloneUrl,
            prInfos.ref,
            prInfos.sha,
            configBlock,
            data.randomString(80)
        )
        .then((docker) => {
            dns.publishDnsRecord(
                emailInfos.repoName,
                docker.containerName,
                emailInfos.prId || 0,
                prInfos.ref,
                prInfos.sha
            )
                .then((domain) => {
                    logger.info('Published-domain:', domain);
                    github.addReaction(emailInfos.commentId || 0, emailInfos.repoName, reactions.ROCKET);
                    github
                        .updateComment(
                            emailInfos.prId || 0,
                            prInfos.repoSlug,
                            deployCommentId,
                            comments.getDeployedComment(
                                emailInfos.commentId || 0,
                                prInfos.ref,
                                prInfos.sha,
                                docker.containerName,
                                domain
                            )
                        )
                        .then(() => {
                            logger.info('Updated comment:#' + deployCommentId);
                        })
                        .catch((error: Error) => logger.error(error));
                })
                .catch((error: Error) => logger.error(error, emailInfos));
        })
        .catch((error: Error) => logger.error(error, prInfos, emailInfos));
};

export default {
    deploy: (emailInfos: emailData, configBlock: string) => {
        if (emailInfos.prId === null || emailInfos.commentId === null) {
            logger.error('Missing data !', emailInfos);
            return;
        }
        const prId = emailInfos.prId || 0;
        github
            .getPrInfos(emailInfos.prId || 0, emailInfos.repoName)
            .then((prInfos) => {
                Message.forPr(prId, emailInfos.repoName).then((messages) => {
                    if (messages.length === 0) {
                        logger.debug('No comment found, posting one.');
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
                            .then((deployComment) =>
                                afterComment(configBlock, emailInfos, deployComment.data.id, {
                                    sha: prInfos.data.head.sha,
                                    ref: prInfos.data.head.ref,
                                    cloneUrl: prInfos.data.head.repo.clone_url,
                                    repoSlug: prInfos.data.base.repo.full_name,
                                })
                            )
                            .catch((error: Error) => logger.error(error, prInfos, emailInfos));
                        return;
                    }
                    logger.debug('Comment found, using it.');
                    const lastMessage = messages[messages.length - 1];
                    afterComment(configBlock, emailInfos, lastMessage.getCommentId(), {
                        sha: prInfos.data.head.sha,
                        ref: prInfos.data.head.ref,
                        cloneUrl: prInfos.data.head.repo.clone_url,
                        repoSlug: prInfos.data.base.repo.full_name,
                    });
                });
            })
            .catch((error: Error) => logger.error(error, emailInfos));
    },
};
