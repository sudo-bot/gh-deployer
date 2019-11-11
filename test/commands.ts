'use strict';

require('module-alias/register');

process.env.ALLOWED_USERNAMES = 'test1,test2';
process.env.PMA_CONFIG_FILE = __filename;

import commands from '@src/commands';
import { expect } from 'chai';

/**
 *
 * @param items An array of items.
 * @param fn A function that accepts an item from the array and returns a promise.
 * @returns {Promise}
 */
function forEachPromise(items: any[], fn: Function) {
    return items.reduce(function(promise: Promise<void>, item) {
        return promise.then(function() {
            return fn(item);
        });
    }, Promise.resolve());
}

export default async function() {
    await commands.train();
    suite('commands', function() {
        test('test DEPLOY_AND_MERGE_COMMANDS commands', function(done) {
            const DEPLOY_AND_MERGE_COMMANDS_EXAMPLES: string[] = [];
            commands.DEPLOY_AND_MERGE_COMMANDS.forEach(command => {
                DEPLOY_AND_MERGE_COMMANDS_EXAMPLES.push(
                    command.replace('%branchSrc%', 'QA').replace('%branchDst%', 'master')
                );
            });
            forEachPromise(DEPLOY_AND_MERGE_COMMANDS_EXAMPLES, (text: string) => {
                return new Promise(resolve => {
                    commands
                        .getCommand(text)
                        .then(result => {
                            //console.log(result.debug.classification);
                            expect(result.command, 'Tested-command: "' + text + '"').to.equal(
                                commands.COMMANDS.DEPLOY_AND_MERGE
                            );
                            expect(result.options, 'Tested-command: "' + text + '"').to.deep.equal({
                                branchDst: 'master',
                                branchSrc: 'QA',
                            });
                            resolve();
                        })
                        .catch(err => done(err));
                });
            }).then(() => {
                done();
            });
        });
        test('test DEPLOY_WITH_CONFIG_COMMANDS commands', function(done) {
            const DEPLOY_WITH_CONFIG_COMMANDS_EXAMPLES: string[] = [];
            const configBlockBase1 = `\`\`\`php
            <?php
            declare(strict_types=1);
            \$i = 0;
            \$i++;
            \$cfg['Servers'][\$i]['auth_type'] = 'cookie';
            \$cfg['Servers'][\$i]['host'] = 'mariadb1.domain.ltd';
            \$cfg['Servers'][\$i]['compress'] = false;
            \$cfg['Servers'][\$i]['AllowNoPassword'] = true;
            \$i++;
            \$cfg['Servers'][\$i]['auth_type'] = 'cookie';
            \$cfg['Servers'][\$i]['host'] = 'mariadb2.domain.ltd';
            \$cfg['Servers'][\$i]['compress'] = false;
            \$cfg['Servers'][\$i]['AllowNoPassword'] = true;
            \$i++;
            \$cfg['Servers'][\$i]['auth_type'] = 'cookie';
            \$cfg['Servers'][\$i]['host'] = 'mysql2.domain.ltd';
            \$cfg['Servers'][\$i]['compress'] = false;
            \$cfg['Servers'][\$i]['AllowNoPassword'] = true;

            \`\`\``;
            const configBlock1 =
                `
            Haha funny some config:
            ` +
                configBlockBase1 +
                `
            Hello world
            `;
            commands.DEPLOY_WITH_CONFIG_COMMANDS.forEach(command => {
                DEPLOY_WITH_CONFIG_COMMANDS_EXAMPLES.push(command.replace('%configBlock%', configBlock1));
            });
            forEachPromise(DEPLOY_WITH_CONFIG_COMMANDS_EXAMPLES, (text: string) => {
                return new Promise(resolve => {
                    commands
                        .getCommand(text)
                        .then(result => {
                            //console.log(result.debug.classification);
                            expect(result.command, 'Tested-command: "' + text + '"').to.equal(
                                commands.COMMANDS.DEPLOY_WITH_CONFIG
                            );
                            expect(result.options, 'Tested-command: "' + text + '"').to.deep.equal({
                                configBlock: configBlockBase1,
                            });
                            resolve();
                        })
                        .catch(err => done(err));
                });
            }).then(() => {
                done();
            });
        });
        test('test DEPLOY_AND_MERGE_WITH_CONFIG_COMMANDS commands', function(done) {
            const DEPLOY_AND_MERGE_WITH_CONFIG_COMMANDS_EXAMPLES: string[] = [];
            const configBlockBase1 = `\`\`\`php
            <?php
            declare(strict_types=1);
            \$i = 0;
            \$i++;
            \$cfg['Servers'][\$i]['auth_type'] = 'cookie';
            \$cfg['Servers'][\$i]['host'] = 'mariadb1.domain.ltd';
            \$cfg['Servers'][\$i]['compress'] = false;
            \$cfg['Servers'][\$i]['AllowNoPassword'] = true;
            \$i++;
            \$cfg['Servers'][\$i]['auth_type'] = 'cookie';
            \$cfg['Servers'][\$i]['host'] = 'mariadb2.domain.ltd';
            \$cfg['Servers'][\$i]['compress'] = false;
            \$cfg['Servers'][\$i]['AllowNoPassword'] = true;
            \$i++;
            \$cfg['Servers'][\$i]['auth_type'] = 'cookie';
            \$cfg['Servers'][\$i]['host'] = 'mariadb3.domain.ltd';
            \$cfg['Servers'][\$i]['compress'] = false;
            \$cfg['Servers'][\$i]['AllowNoPassword'] = true;
            \$i++;
            \$cfg['Servers'][\$i]['auth_type'] = 'cookie';
            \$cfg['Servers'][\$i]['host'] = 'mysql1.domain.ltd';
            \$cfg['Servers'][\$i]['compress'] = false;
            \$cfg['Servers'][\$i]['AllowNoPassword'] = true;
            \$i++;
            \$cfg['Servers'][\$i]['auth_type'] = 'cookie';
            \$cfg['Servers'][\$i]['host'] = 'mysql2.domain.ltd';
            \$cfg['Servers'][\$i]['compress'] = false;
            \$cfg['Servers'][\$i]['AllowNoPassword'] = true;
            \`\`\``;
            const configBlock1 =
                `
            Haha funny some config:
            ` +
                configBlockBase1 +
                `
            Hello world
            `;
            commands.DEPLOY_AND_MERGE_WITH_CONFIG_COMMANDS.forEach(command => {
                DEPLOY_AND_MERGE_WITH_CONFIG_COMMANDS_EXAMPLES.push(
                    command
                        .replace('%branchSrc%', 'QA')
                        .replace('%branchDst%', 'master')
                        .replace('%configBlock%', configBlock1)
                );
            });
            forEachPromise(DEPLOY_AND_MERGE_WITH_CONFIG_COMMANDS_EXAMPLES, (text: string) => {
                return new Promise(resolve => {
                    commands
                        .getCommand(text)
                        .then(result => {
                            //console.log(result.debug.classification);
                            expect(result.command, 'Tested-command: "' + text + '"').to.equal(
                                commands.COMMANDS.DEPLOY_AND_MERGE_WITH_CONFIG
                            );
                            expect(result.options, 'Tested-command: "' + text + '"').to.deep.equal({
                                branchDst: 'master',
                                branchSrc: 'QA',
                                configBlock: configBlockBase1,
                            });
                            resolve();
                        })
                        .catch(err => done(err));
                });
            }).then(() => {
                done();
            });
        });
        test('test DEPLOY_COMMANDS commands', function(done) {
            forEachPromise(commands.DEPLOY_COMMANDS, (text: string) => {
                return new Promise(resolve => {
                    commands
                        .getCommand(text)
                        .then(result => {
                            //console.log(result.debug.classification);
                            expect(result.command, 'Tested-command: "' + text + '"').to.equal(
                                commands.COMMANDS.DEPLOY_PR
                            );
                            expect(result.options, 'Tested-command: "' + text + '"').to.deep.equal({});
                            resolve();
                        })
                        .catch(err => done(err));
                });
            }).then(() => {
                done();
            });
        });
        test('test DO_NOTHING_COMMANDS commands', function(done) {
            forEachPromise(commands.DO_NOTHING_COMMANDS, (text: string) => {
                return new Promise(resolve => {
                    commands
                        .getCommand(text)
                        .then(result => {
                            //console.log(result.debug.classification);
                            expect(result.command, 'Tested-command: "' + text + '"').to.equal(
                                commands.COMMANDS.DO_NOTHING
                            );
                            //expect(result.options, 'Tested-command: "' + text + '"').to.deep.equal({});
                            resolve();
                        })
                        .catch(err => done(err));
                });
            }).then(() => {
                done();
            });
        });
        test('test CREDS_COMMANDS commands', function(done) {
            forEachPromise(commands.CREDS_COMMANDS, (text: string) => {
                return new Promise(resolve => {
                    commands
                        .getCommand(text)
                        .then(result => {
                            //console.log(result.debug.classification);
                            expect(result.command, 'Tested-command: "' + text + '"').to.equal(
                                commands.COMMANDS.SEND_CREDS
                            );
                            //expect(result.options, 'Tested-command: "' + text + '"').to.deep.equal({});
                            resolve();
                        })
                        .catch(err => done(err));
                });
            }).then(() => {
                done();
            });
        });
        /*test('test deploy and merge a into b', function(done) {
            let command = commands.getCommand('Deploy and merge QA into master');
            command
                .then(result => {
                    expect(result.command).to.equal(commands.COMMANDS.DEPLOY_AND_MERGE);
                    expect(result.options).to.deep.equal({
                        branchSrc: 'QA',
                        branchDst: 'master',
                    });
                    done();
                })
                .catch(done);
        });*/
    });
}
