# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Fixed

- [f66a1fd](https://github.com/sudo/gh-deployer/commit/f66a1fd95d520becc4f3278b57ef2b51a1baea55) fix: tests after upgrades and move to randomstring instead of crypto-random-string
- [8fd7cc0](https://github.com/sudo/gh-deployer/commit/8fd7cc085dbefa263862eace9165a387506e2006) fix: code after upgrades

### Features

- [dcdff57](https://github.com/sudo/gh-deployer/commit/dcdff57cd6b1bf9f2ecff163b66fa39da2827060) feat: make PMA_CONFIG_FILE env optional

### Others

- [a749238](https://github.com/sudo/gh-deployer/commit/a7492383171d6adc04336131386b6db99a19bd8c) chore: upgrade node version to min:12 and fix CIs and tsconfig.json
- [69eb69f](https://github.com/sudo/gh-deployer/commit/69eb69ff2afc5a8ac78730cf79061caa3421f0ce) chore: update lock file
- [c87f750](https://github.com/sudo/gh-deployer/commit/c87f75049f76bff3ea2676391a4a51d238bd4a83) chore: upgrade dependencies

## [v2.5.3]

### Features

- [ce71948](https://github.com/sudo/gh-deployer/commit/ce7194834ba1d480347ae8a6d9fb53bb4e3acb9a) feat: update deploy message template

### Documentation

- [a7d6cf3](https://github.com/sudo/gh-deployer/commit/a7d6cf3747a7a6bdc7b2c93214bed5fe30f7bc24) docs: update CHANGELOG.md

### Others

- [6392696](https://github.com/sudo/gh-deployer/commit/6392696e92d5b03438fb0a8fded193b2391950ba) chore: release 2.5.3
- [5c204a6](https://github.com/sudo/gh-deployer/commit/5c204a60c2963d0268685abfae97fc19bfc912fb) chore: update .npmignore

## [v2.5.2]

### Fixed

- [8f93158](https://github.com/sudo/gh-deployer/commit/8f931583b959bbf1c7848e9d9e9a452f97e64e69) fix: delete Message and remove 'origin' from clone

### Others

- [3807508](https://github.com/sudo/gh-deployer/commit/3807508fa6d53b6bcb9d4313f26f0e16a848cd6e) chore: release 2.5.2

## [v2.5.1]

### Fixed

- [57ccbc9](https://github.com/sudo/gh-deployer/commit/57ccbc927820010065f717f7e9ede98b7313fbe3) fix: cloneUrl param

### Others

- [6afc9e8](https://github.com/sudo/gh-deployer/commit/6afc9e834fa4297521dcdd9a049744c33fef00db) chore: release 2.5.1

## [v2.5.0]

### Features

- [ba2d8e4](https://github.com/sudo/gh-deployer/commit/ba2d8e427f3b7d9cf378e39cf4203b268b2b624c) feat: delete comment from database and search for another one

### Others

- [75f0a8b](https://github.com/sudo/gh-deployer/commit/75f0a8b5e660affbc9557f8aef2df18c10de0442) chore: release 2.5.0

## [v2.4.0]

### Features

- [a817615](https://github.com/sudo/gh-deployer/commit/a8176153484986ff512ae59a0392b13062f6b317) feat: use the last posted comment

### Others

- [b958ade](https://github.com/sudo/gh-deployer/commit/b958adebe7a3a4158763f27d4b9c73e1fd0a8fe8) chore: release 2.4.0

## [v2.3.2]

### Features

- [c4414c9](https://github.com/sudo/gh-deployer/commit/c4414c9759adffbe13d3d8692c0f7f09f8d4f20e) feat: better command parsing

### Others

- [8d144cc](https://github.com/sudo/gh-deployer/commit/8d144cc2cfe4445741cbc41f78898c086b2328ad) chore: release 2.3.2

## [v2.3.1]

### Others

- [9124217](https://github.com/sudo/gh-deployer/commit/91242173106fa365d20445a78984507064602bdb) chore: release 2.3.1

## [v2.3.0]

### Features

- [5c0c85b](https://github.com/sudo/gh-deployer/commit/5c0c85b39a0fc5cd9e208b0e6de136317b46cea0) feat: support ENV_FILE ENV

### Others

- [60d6c04](https://github.com/sudo/gh-deployer/commit/60d6c042d0e0d4f777f563af332e39b758c4fade) chore: release 2.3.0

## [v2.2.5]

### Fixed

- [7b9d83a](https://github.com/sudo/gh-deployer/commit/7b9d83a475958505a11b7ee10e7a328e5d971d6a) fix: module is a reserved keyword
- [21400ce](https://github.com/sudo/gh-deployer/commit/21400ce574f366c2e27d966c2f77eca5d95322a6) fix: the sentry appender

### Others

- [7d25f45](https://github.com/sudo/gh-deployer/commit/7d25f45ddb2adab64f90e98054182d7a16869619) chore: release 2.2.5
- [bdfe64a](https://github.com/sudo/gh-deployer/commit/bdfe64a4d49718c58cf877efe6e56f6755488313) ci: Add a build workflow

## [v2.2.4]

### Fixed

- [ce54b1a](https://github.com/sudo/gh-deployer/commit/ce54b1a9c1f4929eaca0e5eee5db46b2b21b8c1b) fix: sentry appender and module loading

### Others

- [b8f1d4a](https://github.com/sudo/gh-deployer/commit/b8f1d4ad26ad4088c0c52093e090b94ffdc46541) chore: release 2.2.4

## [v2.2.3]

### Others

- [40d4944](https://github.com/sudo/gh-deployer/commit/40d4944b9a6036eae75c0db70b14c160426bda99) chore: release 2.2.3
- [55770fa](https://github.com/sudo/gh-deployer/commit/55770fa9b7f0daa4bf613452f8adb6c31bd83029) chore: fix module alias register

## [v2.2.2]

### Fixed

- [cdebdfa](https://github.com/sudo/gh-deployer/commit/cdebdfa97e65b8ac947d8b6aed28b74add42b0d9) fix: load module alias on bin entrypoint and bin

### Others

- [b4107e9](https://github.com/sudo/gh-deployer/commit/b4107e96b7030bd3003aca4f03724e1c24369f1d) chore: release 2.2.2

## [v2.2.1]

### Fixed

- [4cc7180](https://github.com/sudo/gh-deployer/commit/4cc718045f76021365e8527fe84eeed57a940753) fix: build and add a binary target

### Features

- [dc80e2d](https://github.com/sudo/gh-deployer/commit/dc80e2d8653516fcd7695726e795efd414bd591e) feat: publish migrations in dist package

### Others

- [863756e](https://github.com/sudo/gh-deployer/commit/863756ed525201c9529c1beb5d6b9e2253dda297) chore: release 2.2.1

## [v2.2.0]

### Added

- [00df6cc](https://github.com/sudo/gh-deployer/commit/00df6cc3943cc02f65338b388c4d8cbd65282d9c) added: Save the username that sent a message

### Changed

- [05e03c8](https://github.com/sudo/gh-deployer/commit/05e03c824c9ed34ba6117d466f68e12658201179) updated: dependencies and package-lock.json
- [a64b744](https://github.com/sudo/gh-deployer/commit/a64b744a4c3766af74a6f0140e933217aec684d2) updated: dependencies and package-lock.json
- [cd17dd4](https://github.com/sudo/gh-deployer/commit/cd17dd460cbf4d92529dad02d46cc9824c5c1edf) updated: dependencies and package-lock.json
- [63aefa3](https://github.com/sudo/gh-deployer/commit/63aefa306af40168a5c6d49278bab3735d7b5b29) updated: dependencies and package-lock.json

### Fixed

- [7b6f1c5](https://github.com/sudo/gh-deployer/commit/7b6f1c5c06100b9208d2dfa3b214b10dcfee442c) fix: use sudo-bot org name in the package
- [7454c1e](https://github.com/sudo/gh-deployer/commit/7454c1e895d5a5be57527de1dc6d442c2bd88f20) fix: tell TS that the Id will not be undefined
- [4f48053](https://github.com/sudo/gh-deployer/commit/4f4805337393291bd0492341ec20f8100d2177b1) fix: fixes for node-npl v4
- [cb43eda](https://github.com/sudo/gh-deployer/commit/cb43edaaedd204f9bf3e3cb845ad18aea0715a50) fix: email parsing
- [4947c63](https://github.com/sudo/gh-deployer/commit/4947c63742de6934f1207f2653aea913216d3146) fix: octokit constructor after upgrade
- [bbfe91a](https://github.com/sudo/gh-deployer/commit/bbfe91aaf31c7a3fda71889a1157b91cc10206f3) fix: changelog-generator-twig command after upgrade to 1.3.x
- [bb436e6](https://github.com/sudo/gh-deployer/commit/bb436e640bbeb913c5c1859bbc820c4e09e99acd) fix: test after types upgrade
- [3937e83](https://github.com/sudo/gh-deployer/commit/3937e834556e00fdd62263532e7f5b3c4878722a) fix: IMAP double processing unread when restarting the server
- [ec2c451](https://github.com/sudo/gh-deployer/commit/ec2c451926a246a863d30b7ebe1902e8f707c1e2) fix: parsing, remove github footer
- [769f2e2](https://github.com/sudo/gh-deployer/commit/769f2e22b28c291f834654f94e123e629ec1b3a4) fix: typo
- [e2a96d3](https://github.com/sudo/gh-deployer/commit/e2a96d3a350639ff9523ee56dfdbd7c0cb3c3bc8) fix: Message due to 00df6cc3943cc02f65338b388c4d8cbd65282d9c
- [203f29e](https://github.com/sudo/gh-deployer/commit/203f29e4b179885e2b662f50ebd806c6c5d0298e) fix: Identation of Travis CI file
- [2835a01](https://github.com/sudo/gh-deployer/commit/2835a016a4c364fc57b42b977349e5199d22d688) fix: Add migrate before tests on CI
- [1e9a201](https://github.com/sudo/gh-deployer/commit/1e9a201f6bf10f394bf1f016d32ebfff80d5709c) fix: Add MariaDB on CI

### Improvements

- [ba8379a](https://github.com/sudo/gh-deployer/commit/ba8379a0c96b9c0f23b511ce18bf0af3ffbc801f) style: prettier
- [b2509aa](https://github.com/sudo/gh-deployer/commit/b2509aaca8b7735612d2bfc31e39cf3281af18d5) improved: Travis CI file

### Features

- [8e3f2b7](https://github.com/sudo/gh-deployer/commit/8e3f2b7117576c3045af7628057857a27a1b43d8) feat: Rename .env.example to .env.dist and update .npmignore
- [d5f4f2b](https://github.com/sudo/gh-deployer/commit/d5f4f2b4a31e944db6fc87c510d0d1db42689b0a) feat: add node ping route
- [7b30d3a](https://github.com/sudo/gh-deployer/commit/7b30d3a08f939f261e48e5f7f0b966c8e70fe3d2) feat: move to yarn
- [08f9e21](https://github.com/sudo/gh-deployer/commit/08f9e21573429955d52819c8d6809df3c16a122f) feat: simplify .gitignore file
- [8a8f1b7](https://github.com/sudo/gh-deployer/commit/8a8f1b781decddb6546baa2e1645ace314f35305) feat: add a ignore use case
- [de21fc1](https://github.com/sudo/gh-deployer/commit/de21fc1c5306faa831950ec706a465d06999a3ea) feat: add a use case
- [7af34e2](https://github.com/sudo/gh-deployer/commit/7af34e25b9a809911d0b92a169d90f1054ba173e) feat: Implement port

### Others

- [306ff06](https://github.com/sudo/gh-deployer/commit/306ff06007b2fc84263b2dad783f20e0da43fb09) chore: release 2.2.0
- [b0a4312](https://github.com/sudo/gh-deployer/commit/b0a43125fcaa31a0035a58cf9f097d9f523b3c35) chore: upgrade dependencies
- [c3923a3](https://github.com/sudo/gh-deployer/commit/c3923a3b4a60a5e2d1b967b2c07a19b2a9c5e06e) chore: publish to GitHub registry
- [e425b6b](https://github.com/sudo/gh-deployer/commit/e425b6b82e0d6dd248acab8739536007e60a5771) chore: update dependencies and yarn.lock
- [aa65a67](https://github.com/sudo/gh-deployer/commit/aa65a67f61b390e6e9952114f16ff86ec4b50ade) chore: update dependencies and yarn.lock
- [cf32c17](https://github.com/sudo/gh-deployer/commit/cf32c179b4eeb53c5bd70b6d2cc5edb216a01092) chore: remove unused import
- [b3846ee](https://github.com/sudo/gh-deployer/commit/b3846ee6e53dd6850166324fe99b9b991d762ee9) chore: update dependencies and yarn.lock
- [379132a](https://github.com/sudo/gh-deployer/commit/379132a45caa4374872cfa48bdb23d41269cee9e) chore: update dependencies and yarn.lock
- [9f8843a](https://github.com/sudo/gh-deployer/commit/9f8843a0a0f9b0ce2f815af546f6db42f9c45f64) ci: Upgrade sudo-bot/action-pull-request-merge to 1.1.1
- [2ab1a9a](https://github.com/sudo/gh-deployer/commit/2ab1a9a7f361a42fec6b98690bafce2f50e332d7) chore: ignore .nlp files
- [2180383](https://github.com/sudo/gh-deployer/commit/2180383e22d7a24733b73a12e433fdfe7bb995db) chore: bump node engines to >=10
- [6273357](https://github.com/sudo/gh-deployer/commit/6273357a47101b380b16b814c6aa684ec1a61fb7) chore: update dependencies and yarn.lock
- [40fffff](https://github.com/sudo/gh-deployer/commit/40fffffe78cf3663c67edc4a58503c15c788615a) chore: add /*.log to ignore files
- [80130ca](https://github.com/sudo/gh-deployer/commit/80130ca0da0f415e306a1d6dc21a3c952394b8e0) chore: remove codecov dependency
- [ff84fc3](https://github.com/sudo/gh-deployer/commit/ff84fc37870c109bd631e83b73551d4adb3ecb04) ci: move to yarn
- [ab7569c](https://github.com/sudo/gh-deployer/commit/ab7569c640db5eeaa6367f429cf82bcab02e5f9b) chore: update dependencies and package-lock.json
- [95acd1e](https://github.com/sudo/gh-deployer/commit/95acd1e556dac8e51aba16dec9e4972a2953bc2e) ci: Fix badges and job name
- [460a1d3](https://github.com/sudo/gh-deployer/commit/460a1d3e749b6f18c7fbe3ebf84fccda37dcbdc3) ci: Migrate before tests and change db name
- [693bdf3](https://github.com/sudo/gh-deployer/commit/693bdf37e2c350a4806c6deab15af1c3d22accba) ci: fix indentation and remove mac os from matrix
- [7544d27](https://github.com/sudo/gh-deployer/commit/7544d272e136dcc9773007d5943edcfd9d8fa91f) ci: fix github actions folder
- [1f418ca](https://github.com/sudo/gh-deployer/commit/1f418cae1799ab49e172519bcaa1e0dc21870f5c) ci: Migrate to github actions
- [37c83bc](https://github.com/sudo/gh-deployer/commit/37c83bc084a92fb551f08224b2c595b2c682c521) chore: update dependencies and package-lock.json

## [v2.0.0]

### Added

- [9051436](https://github.com/sudo/gh-deployer/commit/9051436c599bc03ee8fdbcde14f3640324766cc2) added: Save domains into database
- [eea407c](https://github.com/sudo/gh-deployer/commit/eea407cf193552f0fad016c3be8843c6a3e220ef) added: Save containers into database
- [f6068d4](https://github.com/sudo/gh-deployer/commit/f6068d4ef8f81d7a1cef2313b4035782fa77d783) added: domains and containers
- [de1d570](https://github.com/sudo/gh-deployer/commit/de1d570caec16662083473f5975277a9de85345e) added: Sent and received messages to database
- [6509db3](https://github.com/sudo/gh-deployer/commit/6509db373cafa25422e3b9862d80db56b2370ea7) added: Message model
- [2fd0e5d](https://github.com/sudo/gh-deployer/commit/2fd0e5db089890463ee5a3c46ccd5c814a1a928d) added: models and migrations
- [520ec93](https://github.com/sudo/gh-deployer/commit/520ec9398fa3ed0383c298616d43c9991c741ce5) added: Knex for SQL requests and migrations
- [0bf50c6](https://github.com/sudo/gh-deployer/commit/0bf50c6d69b579cc4da0e1c60cced9af5e517ac3) added: CLOUDFLARE_RECORD_TYPE to ENV
- [a3dde36](https://github.com/sudo/gh-deployer/commit/a3dde36ea09eb90754d1112d6d2b5c5eaae7d4e7) added: Reactions when deploy command is received
- [e9489fa](https://github.com/sudo/gh-deployer/commit/e9489fa20dd6d94247e72371a0dbd748f86519c3) added: ts-node
- [1d89b8d](https://github.com/sudo/gh-deployer/commit/1d89b8dc9d527a6080776b7a98fb89163aa3869f) added: typescript
- [c168d6f](https://github.com/sudo/gh-deployer/commit/c168d6f4adc9818c639eb0edddb3d268d52704e2) added: Labels to docker create
- [07938d5](https://github.com/sudo/gh-deployer/commit/07938d551404070fdf5e5bd43615a77ac9e3bdd8) added: debug line
- [a340450](https://github.com/sudo/gh-deployer/commit/a34045050554bb012be8af46ad3933ff9890e68c) added: parseReplyToRepoName and parseCommentId and parsePrId
- [cb9deed](https://github.com/sudo/gh-deployer/commit/cb9deed7c432b996ce7a1e8a46662503434658ae) added: getMetaDataFromMessage

### Changed

- [58d96b0](https://github.com/sudo/gh-deployer/commit/58d96b0d94490512deb97d67926db27d15755798) updated: dependencies and package-lock.json
- [5f795e6](https://github.com/sudo/gh-deployer/commit/5f795e6014ab6cb51de7bf329acc6eae90162d3f) updated: move update listeners to after connected
- [e4234ee](https://github.com/sudo/gh-deployer/commit/e4234ee8b07b5862dc4de00ee2726caa864f5882) updated: imap auth timeout
- [7aa4aac](https://github.com/sudo/gh-deployer/commit/7aa4aacd4b618a21606c3f6cb19f7c0e1ea42431) updated: @sentry/node from 5.0.5 to 5.0.6

### Removed

- [25a116c](https://github.com/sudo/gh-deployer/commit/25a116cb7ab689c2025395ab1ffda8d7913f2530) removed: octonode to use octokit
- [1224618](https://github.com/sudo/gh-deployer/commit/1224618768f74d52d0a5c38928a4435cc5fe77cb) removed: sentencer dependency
- [a6e17c7](https://github.com/sudo/gh-deployer/commit/a6e17c760cc8d93aad5dac2a4d6611e6e111abfa) removed: DEPLOY_AND_MERGE & DEPLOY_AND_MERGE_WITH_CONFIG
- [3c6eaad](https://github.com/sudo/gh-deployer/commit/3c6eaad05370ccf46e268e9ec351a9ceb3d2a673) removed: PR id parsing from comment

### Fixed

- [a08fe13](https://github.com/sudo/gh-deployer/commit/a08fe13f86510c8980e83fa862fe160dae89a321) fix: posting reactions
- [fa233a5](https://github.com/sudo/gh-deployer/commit/fa233a5b8b6e32a593b4d606b7b3ee097772dbb5) fix: Tests after ts-node e9489fa20dd6d94247e72371a0dbd748f86519c3
- [17c2e97](https://github.com/sudo/gh-deployer/commit/17c2e972f0d2af68bcf589d2971f5c38028bd550) fix: bugs introduced by 77e0fc5ebe23c8de02a40bca07ce3cfe4e438bb6
- [77e0fc5](https://github.com/sudo/gh-deployer/commit/77e0fc5ebe23c8de02a40bca07ce3cfe4e438bb6) fix: implementation to use octokit
- [e0d7cc7](https://github.com/sudo/gh-deployer/commit/e0d7cc7394c3b0eff6da5c744eecb28f1c1a3f1a) fix: tests (move to typescript)
- [58bcabb](https://github.com/sudo/gh-deployer/commit/58bcabbd6ecfd49967da6d081abc97c686bbba13) fix: make default tag a string to avoid docker error
- [90fa92a](https://github.com/sudo/gh-deployer/commit/90fa92abbbbe913c2e44862d16acf2826955fc5e) fix: make prId a string to avoid docker error
- [85aa33a](https://github.com/sudo/gh-deployer/commit/85aa33a358b69a5f1dd43217f6e8c9b652bc2be5) fix: 'replyto' is an object and fallback onto 'to'
- [4b58a40](https://github.com/sudo/gh-deployer/commit/4b58a4062da419ded61b4f91d4a95ae3ed28cd6d) fix: x-github-sender is in lowercase
- [e294462](https://github.com/sudo/gh-deployer/commit/e294462fec3d7b5ed8c3dba4e672782f0f122a6b) fix: headers of mailparser is a map
- [2e3fcf7](https://github.com/sudo/gh-deployer/commit/2e3fcf785eb881add8230a11de84d1a7b2c0e283) fix: hack the double read emails on start bug
- [8f959ed](https://github.com/sudo/gh-deployer/commit/8f959ed5af2eb171db4a95a95ae5c295a614c8f7) fix: new email detection on start
- [e867fd1](https://github.com/sudo/gh-deployer/commit/e867fd15e260f2c8a07a0d7d880ab7ee02121ae0) fix: parse docker memory as int
- [7db07e5](https://github.com/sudo/gh-deployer/commit/7db07e5cfcdae8b213801bf586bad84fc86cb8bf) fix: memory bytes to MB
- [5cc5d97](https://github.com/sudo/gh-deployer/commit/5cc5d97aef114bb340960bfc3945479c899143e2) fix: docker memory config

### Improvements

- [3c2281e](https://github.com/sudo/gh-deployer/commit/3c2281e149f149fce6a3cbf6f78e768e1f6fb08c) improved: typescript hint
- [027fb23](https://github.com/sudo/gh-deployer/commit/027fb235a97fe741433d48f944a14acf2995c747) improved: Use strict mode of typescript
- [e82b699](https://github.com/sudo/gh-deployer/commit/e82b6994d717c402e1b3ee7b702f4ac81b003e9e) improved: types
- [8903050](https://github.com/sudo/gh-deployer/commit/8903050ad75b2050fc02b657f0d906b1b8e04fa5) improved: Move to typescript
- [a8e26a1](https://github.com/sudo/gh-deployer/commit/a8e26a165f6b7b923978f4bd9df0850071c4f485) improved: Handle disconnection and error
- [259cd89](https://github.com/sudo/gh-deployer/commit/259cd891089c5da5be531a76def0ea8ae12c6f8d) improved: email data handling and sender username parsing

## [v1.1.0]

### Added

- [c9aabd3](https://github.com/sudo/gh-deployer/commit/c9aabd32d4f13941d06383e72b4006c5b69b513b) added: replace tokens in DOCKER_NETWORK_ALIASES ENV
- [9bd42f2](https://github.com/sudo/gh-deployer/commit/9bd42f2264bec9ec77db5db510dc9ad6ab434e56) added: support for network aliases
- [fef9b3f](https://github.com/sudo/gh-deployer/commit/fef9b3fd192accf37fe40e2b8b52ce00809f9d7a) added: memory limit
- [88ad95c](https://github.com/sudo/gh-deployer/commit/88ad95c75d7f0a8823478700bf6f93f56715b5d0) added: imap to package.json and package-lock.json
- [8433391](https://github.com/sudo/gh-deployer/commit/8433391fd9aae68918ecdcad1d2ef331cb05e597) added: mail-listener2 code into utils
- [806ff26](https://github.com/sudo/gh-deployer/commit/806ff267132ec1bf45107a28da125cfc920cbff8) added: MAILBOX_DEBUG option
- [b9bf99f](https://github.com/sudo/gh-deployer/commit/b9bf99f73d9a519107e2fc4a7407e2972db10cd5) added: support for real imap server
- [e51acaa](https://github.com/sudo/gh-deployer/commit/e51acaa552e4b1e02ed35f7ee83df87893266e37) added: example ENVs
- [e08145f](https://github.com/sudo/gh-deployer/commit/e08145f407039fb2a4d85dd6c42dd88e35e1f549) added: mail-listener2
- [c6d3b5a](https://github.com/sudo/gh-deployer/commit/c6d3b5ae50cc302aaa9af21baf3c64ec366251e6) added: command to ignore
- [14e83bf](https://github.com/sudo/gh-deployer/commit/14e83bf8b3d4489bbb0a5bd0b45ef89499a6a1ab) added: dependabot config
- [28a46bd](https://github.com/sudo/gh-deployer/commit/28a46bdbe14ba8c512b1982ce4c19f912d8a9c6a) added: synk and dependabot badges

### Changed

- [9a41b1f](https://github.com/sudo/gh-deployer/commit/9a41b1f8d8b0ec37d75e250be2babf9f90fca14c) updated: Split Travis CI to jobs
- [8fa5e09](https://github.com/sudo/gh-deployer/commit/8fa5e0943878e3ca4cd8a7a85e5ee8e9012fd39a) updated: Moved training to index
- [8773478](https://github.com/sudo/gh-deployer/commit/87734785da479254b34db6434ab23e8e5de34a8b) updated: Moved files and renamed one
- [95a07f0](https://github.com/sudo/gh-deployer/commit/95a07f0ff0908219951b099cc918ba15671d22d5) updated: jshintrc to esnext
- [e3aa0a6](https://github.com/sudo/gh-deployer/commit/e3aa0a6fed2db11e0e2fb5221bddde9ba3bd7d15) updated: package.json and package-lock.json
- [1a3325c](https://github.com/sudo/gh-deployer/commit/1a3325c5348b374b087a77991b1d3352f32b16c7) updated: dependencies
- [e66181d](https://github.com/sudo/gh-deployer/commit/e66181d65b91e69bcf8e01e6a5f40c77a83fd875) updated: package.json && package-lock.json
- [6f0ee0e](https://github.com/sudo/gh-deployer/commit/6f0ee0e9cbdf06876e94cff00e557d7b6c21f991) updated: package.json && package-lock.json
- [a946722](https://github.com/sudo/gh-deployer/commit/a946722e65e7fbda30b3859edbfb6e76c9b4be59) update: CHANGELOG.md

### Removed

- [ae94d3b](https://github.com/sudo/gh-deployer/commit/ae94d3b05748b440b1cdd31e73d44c42d7253bf1) removed: async and 'self' variables from mail-listener2
- [fd360fb](https://github.com/sudo/gh-deployer/commit/fd360fb7af0efa71c5bdbe8fd173d643913f38ca) removed: email parsing from mail-listener2
- [61ef1d1](https://github.com/sudo/gh-deployer/commit/61ef1d13378b75558eb70611e823ec6c7bd5633a) removed: attachment config and fixed import
- [cd1d65c](https://github.com/sudo/gh-deployer/commit/cd1d65c52d6468ec1cae479f6eac0d4a47c3f537) removed: attachement handling from mail-listener2
- [908bafd](https://github.com/sudo/gh-deployer/commit/908bafdd039507970631feee9695f4950b35b5e8) removed: mail-listener2

### Fixed

- [8310101](https://github.com/sudo/gh-deployer/commit/831010171897bf5f7435fae30e94efc1f5239053) fix: .jshintrc errors introduced by 95a07f0ff090821
- [cd9de1f](https://github.com/sudo/gh-deployer/commit/cd9de1f3eed20026edea34657c4ca7e1a42bc740) fix: naming issue
- [f9f0eee](https://github.com/sudo/gh-deployer/commit/f9f0eeec807efc39b4af4d82517951d0e08f1286) fix: commands tests
- [7a64f37](https://github.com/sudo/gh-deployer/commit/7a64f376f42c9670be6b7b00f1c158c97fc02fcf) fixed: .npmignore

### Improvements

- [709f0c2](https://github.com/sudo/gh-deployer/commit/709f0c21502c4e9929717636f3897d42ea657260) style: prettier mail-listener2

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


[Unreleased]: https://github.com/sudo/gh-deployer/compare/v2.5.3...HEAD
[v2.5.3]: https://github.com/sudo/gh-deployer/compare/v2.5.2...v2.5.3
[v2.5.2]: https://github.com/sudo/gh-deployer/compare/v2.5.1...v2.5.2
[v2.5.1]: https://github.com/sudo/gh-deployer/compare/v2.5.0...v2.5.1
[v2.5.0]: https://github.com/sudo/gh-deployer/compare/v2.4.0...v2.5.0
[v2.4.0]: https://github.com/sudo/gh-deployer/compare/v2.3.2...v2.4.0
[v2.3.2]: https://github.com/sudo/gh-deployer/compare/v2.3.1...v2.3.2
[v2.3.1]: https://github.com/sudo/gh-deployer/compare/v2.3.0...v2.3.1
[v2.3.0]: https://github.com/sudo/gh-deployer/compare/v2.2.5...v2.3.0
[v2.2.5]: https://github.com/sudo/gh-deployer/compare/v2.2.4...v2.2.5
[v2.2.4]: https://github.com/sudo/gh-deployer/compare/v2.2.3...v2.2.4
[v2.2.3]: https://github.com/sudo/gh-deployer/compare/v2.2.2...v2.2.3
[v2.2.2]: https://github.com/sudo/gh-deployer/compare/v2.2.1...v2.2.2
[v2.2.1]: https://github.com/sudo/gh-deployer/compare/v2.2.0...v2.2.1
[v2.2.0]: https://github.com/sudo/gh-deployer/compare/v2.0.0...v2.2.0
[v2.0.0]: https://github.com/sudo/gh-deployer/compare/v1.1.0...v2.0.0
[v1.1.0]: https://github.com/sudo/gh-deployer/compare/v1.0.0...v1.1.0
[v1.0.0]: https://github.com/sudo/gh-deployer/compare/5f5552755301e92a762698db33127c44e924fac6...v1.0.0

