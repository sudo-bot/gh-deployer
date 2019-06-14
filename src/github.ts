'use strict';

const octonode = require('octonode');
const GHclient = octonode.client(process.env.GITHUB_TOKEN);

export default {
    createComment: (prId: number, repoName: string, commentBody: string) => {
        return new Promise((resolve, reject: (err: Error | null) => void) => {
            const ghissue = GHclient.issue(repoName, prId);
            ghissue.createComment(
                {
                    body: commentBody,
                },
                (err, data) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(data);
                    }
                }
            );
        });
    },
    updateComment: (prId: number, repoName: string, commentId: number, commentBody: string) => {
        return new Promise((resolve, reject: (err: Error | null) => void) => {
            const ghissue = GHclient.issue(repoName, prId);
            ghissue.updateComment(
                commentId,
                {
                    body: commentBody,
                },
                (err, data) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(data);
                    }
                }
            );
        });
    },
    getPrInfos(prId: number, repoName: string) {
        return new Promise((resolve, reject: (err: Error | null) => void) => {
            const ghpr = GHclient.pr(repoName, prId);
            ghpr.info((err, data: object) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            });
        });
    },
};
