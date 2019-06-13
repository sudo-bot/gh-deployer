'use strict';

require('module-alias/register');

import docker from '@src/docker';
import { expect } from 'chai';

export default function() {
    suite('docker', function() {
        test('test docker create aliases from null or undefined', function(done) {
            expect(docker.createAliasesFromString(null)).to.deep.equal({});
            expect(docker.createAliasesFromString(undefined)).to.deep.equal({});
            done();
        });
        test('test docker create aliases from empty string', function(done) {
            expect(docker.createAliasesFromString('')).to.deep.equal({});
            done();
        });
        test('test docker create aliases from valid string (dataset-1)', function(done) {
            expect(
                docker.createAliasesFromString(
                    'dockerNetworkName!projectname-pr-{{prId}}.projectname.local;projectname-pr-{{prId}}'
                )
            ).to.deep.equal({
                dockerNetworkName: {
                    Aliases: ['projectname-pr-{{prId}}.projectname.local', 'projectname-pr-{{prId}}'],
                },
            });
            done();
        });
        test('test docker create aliases from valid string (dataset-2)', function(done) {
            expect(
                docker.createAliasesFromString('dockerNetworkName!projectname-pr-{{prId}}.projectname.local')
            ).to.deep.equal({
                dockerNetworkName: {
                    Aliases: ['projectname-pr-{{prId}}.projectname.local'],
                },
            });
            done();
        });
        test('test docker create aliases from invalid string (dataset-3)', function(done) {
            expect(docker.createAliasesFromString('dockerNetworkName!')).to.deep.equal({});
            done();
        });
        test('test docker create aliases from valid string (dataset-4)', function(done) {
            expect(
                docker.createAliasesFromString(
                    'dockerNetworkName!projectname-pr-{{prId}}.projectname.local;projectname-pr-{{prId}},network2!network2-pr-{{prId}}.network2.local;network2-pr-{{prId}}'
                )
            ).to.deep.equal({
                dockerNetworkName: {
                    Aliases: ['projectname-pr-{{prId}}.projectname.local', 'projectname-pr-{{prId}}'],
                },
                network2: {
                    Aliases: ['network2-pr-{{prId}}.network2.local', 'network2-pr-{{prId}}'],
                },
            });
            done();
        });
        test('test docker create aliases from valid string, check trim (dataset-5)', function(done) {
            expect(
                docker.createAliasesFromString(
                    ' dockerNetworkName ! projectname-pr-{{prId}}.projectname.local ;projectname-pr-{{prId}} , network2! network2-pr-{{prId}}.network2.local ; network2-pr-{{prId}}'
                )
            ).to.deep.equal({
                dockerNetworkName: {
                    Aliases: ['projectname-pr-{{prId}}.projectname.local', 'projectname-pr-{{prId}}'],
                },
                network2: {
                    Aliases: ['network2-pr-{{prId}}.network2.local', 'network2-pr-{{prId}}'],
                },
            });
            done();
        });
    });
};
