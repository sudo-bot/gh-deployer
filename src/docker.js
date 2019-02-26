'use strict';

const { Docker } = require('node-docker-api');

const docker = new Docker({ socketPath: '/var/run/docker.sock' });
const data = require('@src/data');

module.exports = {
    createDocker: (prId, cloneUrl, ref, sha, compiledPhpMyAdminConfig) => {
        return new Promise((resolve, reject) => {
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
                    if (container) {
                        container.remove();
                    } else {
                        console.log('container removed', data);
                    }
                })
                .catch(function(err) {
                    console.log(err);
                })
                .then(function(data) {
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
                            Volumes: {
                                '/refs': {},
                            },
                            WorkingDir: process.env.DOCKER_WORKDIR,
                            HostConfig: {
                                DnsSearch: process.env.DOCKER_DNS_SEARCH.split(','),
                                NetworkMode: process.env.DOCKER_NETWORK_MODE,
                                Binds: process.env.DOCKER_BINDS.split(','),
                            },
                            Entrypoint: process.env.DOCKER_ENTRYPOINT,
                            Env: [
                                'REF_DIR=/refs',
                                'GIT_URL=' + cloneUrl,
                                'GIT_BRANCH=origin/' + ref,
                                'GIT_SHA=' + sha,
                                'PMA_CONFIG=' + compiledPhpMyAdminConfig,
                            ],
                        })
                        .then(container => container.start())
                        .then(container => {
                            container
                                .status()
                                .then(status => {
                                    resolve(status);
                                })
                                .catch(error => reject(error));
                        })
                        /*.then(container => container.stop())
                        .then(container => container.restart())
                        .then(container => container.delete({ force: true }))*/
                        .catch(error => reject(error));
                });
        });
    },
};
