'use strict';

const octonode = require('octonode');
const GHclient = octonode.client(process.env.GITHUB_TOKEN);

module.exports = {
    createComment: (prId, repoName, commentId, ref, sha) => {
        return new Promise((resolve, reject) => {
            const ghissue = GHclient.issue(repoName, prId);
            ghissue.createComment(
                {
                    body:
                        '<!--\nsudobot:' +
                        JSON.stringify({
                            commentId: commentId,
                            ref: ref,
                            sha: sha,
                        }) +
                        '\n-->\nDeploying: `' +
                        ref +
                        '` commit: `' +
                        sha +
                        '`\n' +
                        '\n---\n' +
                        '_This message will be updated with the progress of the deploy_\n',
                },
                (err, data) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(data);
                        //console.log(data.html_url, data.author_association);
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
