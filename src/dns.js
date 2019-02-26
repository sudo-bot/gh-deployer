'use strict';

const cf = require('cloudflare')({
    email: process.env.CLOUDFLARE_EMAIL,
    key: process.env.CLOUDFLARE_KEY,
});

const data = require('@src/data');

module.exports = {
    publishDnsRecord: (prId, ref, sha) => {
        return new Promise((resolve, reject) => {
            let domainName = data.replaceTokens(
                {
                    prId: prId,
                    ref: ref,
                    sha: sha,
                },
                '' + process.env.CLOUDFLARE_RECORD_NAME
            );
            cf.dnsRecords
                .add(process.env.CLOUDFLARE_ZONEID, {
                    type: 'A',
                    name: domainName,
                    content: process.env.CLOUDFLARE_RECORD_CONTENT,
                })
                .then(function(resp) {
                    resolve(domainName, resp);
                })
                .catch(reject);
        });
    },
};
