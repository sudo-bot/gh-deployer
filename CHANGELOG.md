# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [Unreleased]



## [v1.0.0]

### Added
- [1561b46](https://github.com/sudo/gh-deployer/commit/1561b4609632728f39be21e5d6026c36085e8b51) add: CHANGELOG.md
- [a18f7d1](https://github.com/sudo/gh-deployer/commit/a18f7d1b1ddb24d1dd503fdf759d6f596eee7c48) add: CHANGELOG generator
- [4ee0283](https://github.com/sudo/gh-deployer/commit/4ee02830f1d02a205f24306aef433adc78607d25) add: NODE_ENV and NODE_ENV to Sentry
- [965d0e3](https://github.com/sudo/gh-deployer/commit/965d0e3b04f93dcf958b895478d75df122ca23ab) add: data.getDataFromConfig
- [4ef1498](https://github.com/sudo/gh-deployer/commit/4ef1498ea8bf146083a9a9a243ad526c3f01b60f) add: DOCKER_VOLUMES ENV
- [47eddfa](https://github.com/sudo/gh-deployer/commit/47eddfa1b38f06afb2b29951abb3d5058230c98f) add: RANDOM_STRING ENV and PMA_CONFIG_FILE ENV
- [b5147b2](https://github.com/sudo/gh-deployer/commit/b5147b2703e3b4f9fa2267762c43b6e211781d4b) add: Added ALLOWED_USERNAMES to ENV variables
- [d679a1f](https://github.com/sudo/gh-deployer/commit/d679a1f76c9dd3d50b0d8b2e36bf08218a394c27) add: Add emailInfos to log warning
- [b20e21f](https://github.com/sudo/gh-deployer/commit/b20e21f4f075150119da58c968fe1c378841e045) add: Handle commands and move some code
- [6a5efd0](https://github.com/sudo/gh-deployer/commit/6a5efd06849a34059d4bd60434e445bfa831d5a7) add: Use log4js and Sentry
- [9667fd3](https://github.com/sudo/gh-deployer/commit/9667fd304d0b2abfd69dbeb94f8e3cf71c9f7e63) add: Add coverage badge and cover all files
- [74ebb94](https://github.com/sudo/gh-deployer/commit/74ebb943f8f4d3623be47dfb390662107497d596) add: Travis badge to README
- [b6beaef](https://github.com/sudo/gh-deployer/commit/b6beaefd7d322acc12b115653d54ca5590aeb2e7) add: blowfish_secret and TempDir to config
- [d52aa47](https://github.com/sudo/gh-deployer/commit/d52aa4762f5d1152efa108bf4137bc5ba3b608a7) add: comment update & bug fixed CF DNS
- [7ab88d3](https://github.com/sudo/gh-deployer/commit/7ab88d3c22151c27ba1049b576b540af69ee2fe7) add: Support for cloudflare DNS publishing
- [ddbc10d](https://github.com/sudo/gh-deployer/commit/ddbc10df4b803a2adc9e2f4f48ef3c313e15ac40) add: container remove if started
- [d1ea4ea](https://github.com/sudo/gh-deployer/commit/d1ea4eafa5c23fe6b17a32e7940fbaccac7837b5) add: base files

### Changed
- [9f4ab9c](https://github.com/sudo/gh-deployer/commit/9f4ab9c4b626a9cb23d22b0e5965ad2f7d0b27d8) update: Use node-npl and add commands
- [1877bbb](https://github.com/sudo/gh-deployer/commit/1877bbbd488dff4c4c0edefef5209e21e9461618) update: Update mocha to ^6.0.2

### Removed
- [13ff6ab](https://github.com/sudo/gh-deployer/commit/13ff6abe4e8727d68b7ce4c0a5e6ddedac51b225) remove: CF del DNS record

### Fixed
- [edd85bb](https://github.com/sudo/gh-deployer/commit/edd85bb13aae8228de51d8708166773cbb19e0b0) fix: trim spaces in config
- [9bd2e6f](https://github.com/sudo/gh-deployer/commit/9bd2e6fee4439b5e9bd8659c98e719938525a3d8) fix: COMMANDS
- [cd5dda4](https://github.com/sudo/gh-deployer/commit/cd5dda4f4055b2a5816916a3e55447fb5e4fee2c) fix: REF_DIRECTORY ENV
- [2703158](https://github.com/sudo/gh-deployer/commit/2703158ee608bd3ada690fff34fa8ef858f626a5) fix: gitignore
- [3c305cc](https://github.com/sudo/gh-deployer/commit/3c305cc3839cd398b6501348569c50661a548d86) fix: Tests
- [59ce4df](https://github.com/sudo/gh-deployer/commit/59ce4df1c6958e4ad0fe8abf7f5e5356c982b981) fix: use base repo for updating comments
- [644266a](https://github.com/sudo/gh-deployer/commit/644266a035903fbf7d53e387b420ee4262095928) fix: use of getDataFromMessage
- [6f85b19](https://github.com/sudo/gh-deployer/commit/6f85b190fd1dda05f393afaeb32bb0bca40ed2e5) fix: TypeError
- [7de5e9a](https://github.com/sudo/gh-deployer/commit/7de5e9ab6aac3be0a8717a9d99490e984ff4ff1f) fix: command handler
- [180b5f2](https://github.com/sudo/gh-deployer/commit/180b5f2519014e448c761eb7c8c813ec56ae27c2) fix: Sentry log appender
- [cde0918](https://github.com/sudo/gh-deployer/commit/cde091876bb3b4dfb58bcec801365da832f001af) fix: logger
- [13a4eaa](https://github.com/sudo/gh-deployer/commit/13a4eaa5fd2942f2807f471fe3f64e0fce5de2ee) fix: typo on PR comment call api
- [bcc3132](https://github.com/sudo/gh-deployer/commit/bcc31320c8ba7ed36c3945ab0eab33e4b4f644f5) fix: Use base repo and not head from api results
- [988174f](https://github.com/sudo/gh-deployer/commit/988174f27604bb65a7bac0590d64e0a8ca9031a2) fix: tests and add tests
- [a1013eb](https://github.com/sudo/gh-deployer/commit/a1013eb369251da9b297f324afb8e601c54d13a1) fix: typo in CF dns
- [34d6920](https://github.com/sudo/gh-deployer/commit/34d69201ef51c9d5759d9f5eebac785b12d7d8ac) fix: CF delete if exists
- [0b398b6](https://github.com/sudo/gh-deployer/commit/0b398b6563fa7dc24dc332b7461891af0b5566e5) fix: PR template
- [92097c6](https://github.com/sudo/gh-deployer/commit/92097c6f4134897f2fdffc27efb912f5c62870c1) fix: Added tests and fixed message handling
- [1f87037](https://github.com/sudo/gh-deployer/commit/1f87037a95f85e2c2eef311979b69bd1fcd01b89) fix: docker delete and error handling
- [c57386f](https://github.com/sudo/gh-deployer/commit/c57386fe24e8982fd2227bda90a2f287efd47ce6) fix: docker
- [2bba5e3](https://github.com/sudo/gh-deployer/commit/2bba5e31bbf5d73564b6bb564e2bc766391aaedb) fix: docker container stop
- [e51b571](https://github.com/sudo/gh-deployer/commit/e51b571fa162e735fa95ad116f0f33950613105e) fix: PR id
- [cc2d2f3](https://github.com/sudo/gh-deployer/commit/cc2d2f3865a994a6c2f279be020aa3620dca45d9) fix: Fix getter on env and add debugging infos
- [f07df76](https://github.com/sudo/gh-deployer/commit/f07df76eaccfdc37e613dea2f51e1d18932b22d3) fix: load env

### Improvements
- [9ab3652](https://github.com/sudo/gh-deployer/commit/9ab3652a0a1f640b2856c50283ff6a991c8e6b3e) style: prettier.printWidth=120






[Unreleased]: https://github.com/sudo/gh-deployer/compare/v1.0.0...HEAD
[v1.0.0]: https://github.com/sudo/gh-deployer/compare/5f5552755301e92a762698db33127c44e924fac6...v1.0.0


