'use strict';

import * as Octokit from '@octokit/rest';

const GHclient = new Octokit({
    auth: process.env.GITHUB_TOKEN || '',
});

export enum reactions {
    UPVOTE = '+1',
    DOWNVOTE = '-1',
    LAUGHT = 'laugh',
    CONFUSED = 'confused',
    HEART = 'heart',
    HORRAY = 'hooray',
    ROCKET = 'rocket',
    EYES = 'eyes',
}

export default {
    createComment: (prId: number, repoName: string, commentBody: string) => {
        const repoParts = repoName.split('/');
        return GHclient.issues.createComment({
            owner: repoParts[0],
            repo: repoParts[1],
            issue_number: prId,
            body: commentBody,
        });
    },
    updateComment: (prId: number, repoName: string, commentId: number, commentBody: string) => {
        const repoParts = repoName.split('/');
        return GHclient.issues.updateComment({
            owner: repoParts[0],
            repo: repoParts[1],
            comment_id: commentId,
            body: commentBody,
        });
    },
    getPrInfos(prId: number, repoName: string) {
        const repoParts = repoName.split('/');
        return GHclient.pulls.get({
            owner: repoParts[0],
            repo: repoParts[1],
            pull_number: prId,
        });
    },
    addReaction(commentId: number, repoName: string, content: reactions) {
        const repoParts = repoName.split('/');
        return GHclient.reactions.createForIssueComment({
            owner: repoParts[0],
            repo: repoParts[1],
            comment_id: commentId,
            content: content,
        });
    },
};
