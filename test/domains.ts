'use strict';

require('module-alias/register');

import Domain from '@src/modeles/Domain';
import { expect } from 'chai';

export default function () {
    suite('Domains', () => {
        test('test create and save', (done) => {
            const domain = new Domain('env1.ci.wdes.local', 'env1', 'manual', 'wdes/test-repo');
            domain
                .save()
                .then(() => {
                    Domain.all()
                        .then((domain) => {
                            expect(domain[0].getFullDomainName()).to.equal('env1.ci.wdes.local');
                            expect(domain[0].getShortDomainName()).to.equal('env1');
                            expect(domain[0].getProjectSlug()).to.equal('wdes/test-repo');
                            domain[0].delete().catch((err) => {
                                done(err);
                            });
                            done();
                        })
                        .catch((err) => {
                            done(err);
                        });
                })
                .catch((err) => {
                    done(err);
                });
        });
    });
}
