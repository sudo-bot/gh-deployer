'use strict';

export default {
    getPendingComment(commentId: number, ref: string, sha: string) {
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
    getDeployedComment(commentId: number, ref: string, sha: string, containerName: string, domain: string) {
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
            '\nuser: public\npassword: public\n' +
            '\nor\n' +
            '\nuser: root\npassword: public\n' +
            '\n---\n' +
            '_Deploy in progress or finished_\n'
        );
    },
};
