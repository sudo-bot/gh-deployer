'use strict';

import logger from '@src/logger';
import { Docker } from 'node-docker-api';

const docker = new Docker({ socketPath: '/var/run/docker.sock' });
import data from '@src/data';
import { Container as DockerContainer } from 'node-docker-api/lib/container';
import Container from './modeles/Container';

const createAliasesFromString = (aliasString: string | null | undefined) => {
    aliasString = aliasString || '';
    var networksAndAliases = aliasString.split(','); // Cut each part
    var netAlias: {
        [networkName: string]: {
            Aliases: string[];
        };
    } = {};
    networksAndAliases
        .map((value) => value.split('!')) // Cut networkName and aliases
        .map((value) => {
            if (value[0] !== '' && value[1] !== '') {
                netAlias[value[0].trim()] = {
                    Aliases: value[1].split(';').map((alias) => alias.trim()),
                };
            }
        });
    return netAlias;
};

const labelNamespace = 'fr.wdes.sudo.gh-deployer';

export default {
    createAliasesFromString: createAliasesFromString,
    createDocker: (
        repoName: string,
        prId: number,
        cloneUrl: string,
        ref: string,
        sha: string,
        compiledPhpMyAdminConfig: string | null,
        randomString: string
    ) => {
        return new Promise(
            (
                resolve: (data: { status: DockerContainer; containerName: string }) => void,
                reject: (err: Error) => void
            ) => {
                try {
                    const containerName = data.replaceTokens(
                        {
                            prId: prId,
                            ref: ref,
                            sha: sha,
                        },
                        process.env.DOCKER_CONTAINER_NAME || ''
                    );
                    docker.container
                        .get(containerName)
                        .stop()
                        .then((container) => {
                            return Container.deleteWhereContainerId(container.id).then(() => {
                                return container.delete({ force: true });
                            });
                        })
                        .catch(function (err) {
                            if (err.statusCode === 404) {
                                logger.info('Container ' + containerName + ' not found.');
                            } else {
                                logger.error(err);
                                reject(err);
                            }
                        })
                        .then(() => {
                            logger.info('Deploying: ', containerName);
                            var optionalHostConfig: {
                                Memory?: number;
                            } = {};
                            if (process.env.DOCKER_MEMORY && process.env.DOCKER_MEMORY != '0') {
                                optionalHostConfig.Memory = parseInt(process.env.DOCKER_MEMORY) * 1000000;
                            }
                            const networkAliases = data.replaceTokens(
                                {
                                    prId: prId,
                                    ref: ref,
                                    sha: sha,
                                },
                                process.env.DOCKER_NETWORK_ALIASES || ''
                            );
                            const containerData: any = {
                                Image: process.env.DOCKER_IMAGE,
                                name: containerName,
                                Volumes: (process.env.DOCKER_VOLUMES || '').split(',').reduce(
                                    (accumulator, target) => ({
                                        ...accumulator,
                                        [target]: {},
                                    }),
                                    {}
                                ),
                                WorkingDir: process.env.DOCKER_WORKDIR,
                                HostConfig: {
                                    DnsSearch: (process.env.DOCKER_DNS_SEARCH || '').split(','),
                                    NetworkMode: process.env.DOCKER_NETWORK_MODE,
                                    Binds: (process.env.DOCKER_BINDS || '').split(','),
                                    ...optionalHostConfig,
                                },
                                Entrypoint: process.env.DOCKER_ENTRYPOINT,
                                Env: [
                                    'REF_DIRECTORY=/refs',
                                    'GIT_URL=' + cloneUrl,
                                    'GIT_BRANCH=' + ref,
                                    'GIT_SHA=' + sha,
                                    'RANDOM_STRING=' + randomString,
                                    compiledPhpMyAdminConfig === null ? '' : 'PMA_CONFIG=' + compiledPhpMyAdminConfig,
                                ],
                                NetworkingConfig: {
                                    EndpointsConfig: createAliasesFromString(networkAliases),
                                },
                                Labels: {
                                    [labelNamespace]: 'true',
                                    [labelNamespace + '.git-url']: cloneUrl,
                                    [labelNamespace + '.git-ref']: ref,
                                    [labelNamespace + '.git-sha']: sha,
                                    [labelNamespace + '.github-type']: 'pull-request',
                                    [labelNamespace + '.github-pr-id']: '' + prId,
                                },
                            };
                            const domainName = process.env.DOCKER_DOMAIN_NAME || '';
                            if (domainName.length > 0) {
                                containerData.Domainname = data.replaceTokens(
                                    {
                                        prId: prId,
                                        ref: ref,
                                        sha: sha,
                                    },
                                    domainName
                                );
                            }
                            let hostName = process.env.DOCKER_CONTAINER_HOSTNAME || '';
                            if (hostName.length > 0) {
                                hostName = data.replaceTokens(
                                    {
                                        prId: prId,
                                        ref: ref,
                                        sha: sha,
                                    },
                                    hostName
                                );
                                containerData.Hostname = hostName;
                                containerData.Labels[labelNamespace + '.public-dns-hostname'] = hostName;
                            }
                            docker.container
                                .create(containerData)
                                .then((container) => container.start())
                                .then((container) => {
                                    let c = new Container(container.id, repoName);
                                    c.save();
                                    container
                                        .status()
                                        .then((status) => {
                                            resolve({
                                                status: status,
                                                containerName: containerName,
                                            });
                                        })
                                        .catch((error) => reject(error));
                                })
                                /*.then(container => container.stop())
                        .then(container => container.restart())
                        .then(container => container.delete({ force: true }))*/
                                .catch((error) => reject(error));
                        });
                } catch (error) {
                    reject(error);
                }
            }
        );
    },
};
