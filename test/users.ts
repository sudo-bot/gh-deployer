'use strict';

require('module-alias/register');
import { generate } from 'randomstring';
import User from '@src/modeles/User';
import { expect } from 'chai';
import Knex from '@src/knex';

suite('Users', () => {
    test('test create and save', (done) => {
        const pass = generate({ length: 150 });
        const user = new User('Jean', 'Dupont', 'jean.dupont@dupont.familly', 'jdp', pass);
        user.save()
            .then(() => {
                User.all()
                    .then((users) => {
                        expect(users[0].getEmail()).to.equal('jean.dupont@dupont.familly');
                        expect(users[0].getFirstName()).to.equal('Jean');
                        expect(users[0].getLastName()).to.equal('Dupont');
                        expect(users[0].getUsername()).to.equal('jdp');
                        expect(users[0].isConfirmed()).to.equal(false);
                        expect(users[0].isUnConfirmed()).to.equal(true);
                        expect(users[0].isDisabled()).to.equal(false);
                        users[0].delete().catch((err) => {
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
    test('test getConfirmedUsers', (done) => {
        const pass = generate({ length: 150 });
        const user = new User('Jean', 'Dupont', 'jean.dupont@dupont.familly', 'jdp', pass);
        user.save()
            .then(() => {
                User.getConfirmedUsernames()
                    .then((usernames) => {
                        expect(usernames).to.deep.equal([]);
                        user.delete()
                            .then(() => {
                                done();
                            })
                            .catch((err) => {
                                done(err);
                            });
                    })
                    .catch((err) => {
                        done(err);
                    });
            })
            .catch((err) => {
                done(err);
            });
    });
})
    .beforeAll('Load ENV', (done) => {
        require('dotenv').config({ path: __dirname + '/../.env' });
        Knex.start();
        done();
    })
    .afterAll('Close database', (done) => {
        Knex.stop(() => {
            done();
        });
    });
