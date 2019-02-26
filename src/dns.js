'use strict';

const cf = require('cloudflare')({
    email: process.env.CLOUDFLARE_EMAIL,
    key: process.env.CLOUDFLARE_KEY,
});

const data = require('@src/data');

module.exports = {
    publishDnsRecord: (containerName, prId, ref, sha) => {
        return new Promise((resolve, reject) => {
            let domainName = data.replaceTokens(
                {
                    containerName: containerName,
                    prId: prId,
                    ref: ref,
                    sha: sha,
                },
                '' + process.env.CLOUDFLARE_RECORD_NAME
            );
            cf.dnsRecords
                .delete(process.env.CLOUDFLARE_ZONEID, domainName)
                .then(function() {
                    console.log('Deleted:', domainName);
                })
                .catch(function() {
                    console.log('Not deleted:', domainName);
                })
                .then(function() {
                    cf.dnsRecords
                        .add(process.env.CLOUDFLARE_ZONEID, {
                            type: 'A',
                            name: domainName,
                            content: process.env.CLOUDFLARE_RECORD_CONTENT,
                            proxied: true,
                        })
                        .then(function(resp) {
                            console.log('Added:', domainName);
                            resolve(domainName, resp);
                        })
                        .catch(reject);
                }).catch(reject);
        });
    },
};
