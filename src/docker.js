'use strict';

const logger = require('@src/logger');
const { Docker } = require('node-docker-api');

const docker = new Docker({ socketPath: '/var/run/docker.sock' });
const data = require('@src/data');

const createAliasesFromString = (aliasString) => {
    aliasString = aliasString || '';
    var networksAndAliases = aliasString.split(',');// Cut each part

    networksAndAliases = networksAndAliases.map(value => value.split('!') );// Cut networkName and aliases
    var netAlias = {};
    networksAndAliases.map(value => {
        if (value[0] !== '' && value[1] !== '') {
            netAlias[value[0].trim()] = {
                Aliases: value[1].split(';').map(alias => alias.trim())
            };
        }
    });
    return netAlias;
};

module.exports = {
    createAliasesFromString: createAliasesFromString,
    createDocker: (prId, cloneUrl, ref, sha, compiledPhpMyAdminConfig, randomString) => {
        return new Promise((resolve, reject) => {
            try {
                const containerName = data.replaceTokens(
                    {
                        prId: prId,
                        ref: ref,
                        sha: sha,
                    },
                    '' + process.env.DOCKER_CONTAINER_NAME
                );
                docker.container
                    .get(containerName)
                    .stop()
                    .then(function(container) {
                        return container.delete({ force: true });
                    })
                    .catch(function(err) {
                        if (err.statusCode === 404) {
                            logger.info('Container ' + containerName + ' not found.');
                        } else {
                            logger.error(err);
                            reject(err);
                        }
                    })
                    .then(function() {
                        logger.info('Deploying: ', containerName);
                        const memoryLimit = (process.env.DOCKER_CPU_SHARES || 0) * 1000;
                        docker.container
                            .create({
                                Image: process.env.DOCKER_IMAGE,
                                name: containerName,
                                Hostname: data.replaceTokens(
                                    {
                                        prId: prId,
                                        ref: ref,
                                        sha: sha,
                                    },
                                    '' + process.env.DOCKER_CONTAINER_HOSTNAME
                                ),
                                Domainname: data.replaceTokens(
                                    {
                                        prId: prId,
                                        ref: ref,
                                        sha: sha,
                                    },
                                    '' + process.env.DOCKER_DOMAIN_NAME
                                ),
                                Volumes: process.env.DOCKER_VOLUMES.split(',').reduce(
                                    (accumulator, target) => ({
                                        ...accumulator,
                                        [target]: {},
                                    }),
                                    {}
                                ),
                                WorkingDir: process.env.DOCKER_WORKDIR,
                                HostConfig: {
                                    DnsSearch: process.env.DOCKER_DNS_SEARCH.split(','),
                                    NetworkMode: process.env.DOCKER_NETWORK_MODE,
                                    Binds: process.env.DOCKER_BINDS.split(','),
                                    Memory: memoryLimit,
                                },
                                Entrypoint: process.env.DOCKER_ENTRYPOINT,
                                Env: [
                                    'REF_DIRECTORY=/refs',
                                    'GIT_URL=' + cloneUrl,
                                    'GIT_BRANCH=origin/' + ref,
                                    'GIT_SHA=' + sha,
                                    'RANDOM_STRING=' + randomString,
                                    'PMA_CONFIG=' + compiledPhpMyAdminConfig,
                                ],
                                NetworkingConfig: {
                                    EndpointsConfig: createAliasesFromString(process.env.DOCKER_NETWORK_ALIASES)
                                }
                            })
                            .then(container => container.start())
                            .then(container => {
                                container
                                    .status()
                                    .then(status => {
                                        resolve({
                                            status: status,
                                            containerName: containerName,
                                        });
                                    })
                                    .catch(error => reject(error));
                            })
                            /*.then(container => container.stop())
                        .then(container => container.restart())
                        .then(container => container.delete({ force: true }))*/
                            .catch(error => reject(error));
                    });
            } catch (error) {
                reject(error);
            }
        });
    },
};
