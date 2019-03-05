'use strict';

const octonode = require('octonode');
const GHclient = octonode.client(process.env.GITHUB_TOKEN);

module.exports = {
    createComment: (prId, repoName, commentBody) => {
        return new Promise((resolve, reject) => {
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
    updateComment: (prId, repoName, commentId, commentBody) => {
        return new Promise((resolve, reject) => {
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
    getPrInfos: (prId, repoName) => {
        return new Promise((resolve, reject) => {
            const ghpr = GHclient.pr(repoName, prId);
            ghpr.info((err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            });
        });
    },
};
