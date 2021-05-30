'use strict';

require('module-alias/register');

import Message, { MessagePlatform } from '@src/modeles/Message';
import { expect } from 'chai';
import Knex from '@src/knex';

suite('Users', () => {
    test('test create and save', (done) => {
        const message = new Message('test-user', 2548961, 42, MessagePlatform.github, true);
        message
            .save()
            .then(() => {
                Message.all()
                    .then((message) => {
                        expect(message[0].getUsername()).to.equal('test-user');
                        expect(message[0].getCommentId()).to.equal(2548961);
                        expect(message[0].getPlatform()).to.equal(MessagePlatform.github);
                        expect(message[0].getPrId()).to.equal(42);
                        expect(message[0].isSent()).to.equal(true);
                        expect(message[0].isReceived()).to.equal(false);
                        message[0].delete().catch((err) => {
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
