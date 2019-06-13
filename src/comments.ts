'use strict';

export default {
    getPendingComment(commentId, ref, sha) {
        return (
            //TODO: custom templates
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
    getDeployedComment(commentId, ref, sha, containerName, domain) {
        return (
            //TODO: custom templates
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
            '`\n\n' +
            'url: https://' +
            domain +
            '\nuser: public\nuser: public\n' +
            '\n---\n' +
            '_Deploy finished_\n'
        );
    },
};
