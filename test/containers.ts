'use strict';

require('module-alias/register');

import Container from '@src/modeles/Container';
import { expect } from 'chai';

export default function () {
    suite('Containers', () => {
        test('test create and save', (done) => {
            const container = new Container(
                'd81eae2548e4bcb4b8410bd091f0f4bf49ebf36926d14fc96cbeff3fd9a86f1b',
                'wdes/test-repo'
            );
            container
                .save()
                .then(() => {
                    Container.all()
                        .then((container) => {
                            expect(container[0].getContainerId()).to.equal(
                                'd81eae2548e4bcb4b8410bd091f0f4bf49ebf36926d14fc96cbeff3fd9a86f1b'
                            );
                            expect(container[0].getProjectSlug()).to.equal('wdes/test-repo');
                            container[0].delete().catch((err) => {
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
