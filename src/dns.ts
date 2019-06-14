'use strict';

import logger from '@src/logger';
const cf = require('cloudflare')({
    email: process.env.CLOUDFLARE_EMAIL,
    key: process.env.CLOUDFLARE_KEY,
});

import data from '@src/data';

export interface CFRecord {
    content: string;
    name: string;
    priority?: number;
    proxied?: boolean;
    ttl?: 1 | 120 | 300 | 600 | 900 | 1800 | 3600 | 7200 | 18000 | 43200 | 86400;
    type:
        | 'A'
        | 'AAAA'
        | 'CNAME'
        | 'CAA'
        | 'CERT'
        | 'DNSKEY'
        | 'DS'
        | 'LOC'
        | 'MX'
        | 'NAPTR'
        | 'NS'
        | 'PTR'
        | 'SRV'
        | 'SPF'
        | 'TXT'
        | 'SMIMEA'
        | 'SSHFP'
        | 'TLSA'
        | 'URI'
        | string;
}

export default {
    publishDnsRecord: (containerName: string, prId: number, ref: string, sha: string) => {
        return new Promise((resolve: (domainName: string) => void, reject: (err: Error | null) => void) => {
            let domainName = data.replaceTokens(
                {
                    containerName: containerName,
                    prId: prId,
                    ref: ref,
                    sha: sha,
                },
                process.env.CLOUDFLARE_RECORD_NAME || ''
            );
            const record: CFRecord = {
                type: process.env.CLOUDFLARE_RECORD_TYPE || 'A',
                name: domainName,
                content: process.env.CLOUDFLARE_RECORD_CONTENT || '127.0.0.53',
                proxied: true,
            };

            cf.dnsRecords
                .add(process.env.CLOUDFLARE_ZONEID, record)
                .then(() => {
                    logger.info('Added:', domainName);
                    resolve(domainName);
                })
                .catch(() => {
                    logger.info('Not added:', domainName);
                    resolve(domainName);
                });
        });
    },
};
