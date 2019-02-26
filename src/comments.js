'use strict';

module.exports = {
    getPendingComment: (commentId, ref, sha) => {
        return (
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
            '_This message will be updated with the progress of the deploy_\n'
        );
    },
    getDeployedComment: (commentId, ref, sha, containerName, domain) => {
        return (
            '<!--\nsudobot:' +
            JSON.stringify({
                commentId: commentId,
                ref: ref,
                sha: sha,
            }) +
            '\n-->\nDeployed (' +
            containerName +
            '): `' +
            ref +
            '` commit: `' +
            sha +
            '`\n' +
            '` url: https://' +
            domain +
            '\n' +
            '\n---\n' +
            '_Deploy finished_\n'
        );
    },
};
