# Meth

[![Build Status](https://secure.travis-ci.org/meth-project/meth-browser.svg?branch=master)](http://travis-ci.org/meth-project/meth-browser)
[![codecov](https://codecov.io/gh/meth-project/meth-browser/branch/dev/graph/badge.svg)](https://codecov.io/gh/meth-project/meth-browser)

Cross-platform wallet and dapp browser, for Ethereum addicts!

**NOTE: This is unreleased, Alpha software, very much a work-in-progress**

Features:

* Mnemonic-based HD wallet ([BIP44/EIP85](https://github.com/ethereum/EIPs/issues/85))
* ERC-20 token support, with ability to add custom tokens
* Multi-tab dapp browser with bookmarks
* Interface for interacting with deployed contracts
* Address book
* Transactions view
* Cross-platform (Windows, Linux, Mac, Android, iOS)
* Automatically encrypts and backs up your data
* Real-time sync across your devices
* Connects to main network and all major test networks
* Localhost RPC connection supported (run your own node!)




## Developer guide

**Branches**

 * `dev` - Dev branch (default). Bleeding-edge code.
 * `master` - Production branch. Clean code, only approved pull requests allowed.

**Setup and installation**

  * [Node.js 8.10.0](http://nodejs.org) **<- we recommend using this exact version!**
  * [Yarn 1.0+](yarnpkg.com)
  * [RubyGems](https://rubygems.org)

Once Node is installed, install the dependencies:

```shell
$ yarn
```

Check that you have all necessary system dependencies by running [solidarity](https://github.com/infinitered/solidarity):

```shell
$ yarn solidarity
```

If everything works you should see something like:

```
yarn run v1.1.0
$ "/path/to/meth-browser/node_modules/.bin/solidarity"

✔︎ Solidarity checks valid
✨  Done in 3.29s.
```

**App config**

Run `yarn setup:dev` to generate `appConfig.json`.

**Private Ethereum chain**

Start a local private Ethereum blockchain. We recommend using [Ganache](https://github.com/trufflesuite/ganache).


**Unit tests**

To run the unit tests:

```shell
$ yarn test
```

To run with coverage:

```shell
$ yarn test-cov
```

### Desktop development

To build frontend for development:

```shell
$ yarn web:dev
```

To start the electron backend and full UI:

```shell
$ yarn web:electron
```

### Mobile development

Ensure you have all necessary tools:

```shell
$ brew install watchman
$ xcode-select --install
$ gem install bundler
$ bundle update
```

Ensure you run the mobile setup script (dev mode):

```shell
$ yarn mobile:setup-dev
```

Run the react native packager in one terminal:

```shell
$ yarn mobile:dev
```

_Note: use `yarn mobile:dev --reset-cache` to do a clean package rebuild at any time_.

Now, for Android do:

```shell
$ yarn mobile:android
```

For iOS you will need to update the certificates and provisioning profiles:

```shell
$ bundle exec fastlane match --readonly development
$ bundle exec fastlane match --readonly adhoc
$ bundle exec fastlane match --readonly appstore
```

Then do:

```shell
$ yarn mobile:ios
```

_Note: Running the react native packager will automatically result in the
web packager output folder (`out/`) being deleted, to avoid module collisions_.

### Code style (ESLint)

We use [eslint](http://eslint.org/) to enforce a strict coding style. We've set
it up to auto-lint code upon Git commit. You can manually run the linter
at any time using:

```shell
$ yarn lint:js
```

To auto-fix any issues, run:

```shell
$ yarn lint:js:fix
```


_Note: not all issues are automatically fixable_.

It's worth installing the `prettier-atom` and `linter-eslint` plugins for Atom if
that's your editor - it will make your life easier.

## Packaging and publishing

These instructions are for running on OS X - this is currently the only supported dev platform.

**App config**

Run `yarn setup:prod` to setup `appConfig.json` for production builds. It will
look like this:

```js
{
  "mode": "production"
}
```

### Win/Mac/Linux

**You will need to install Wine for Windows packaging to work, see https://github.com/electron-userland/electron-packager#building-windows-apps-from-non-windows-platforms**

To build installation packages for do:

```shell
$ yarn web:package
```

The `out/` folder will contain the built output.

_Note: To run the built Linux executable on Ubuntu you will first need to do
`apt-get install libgconf-2-4`._

### Android

Requirements:

* You will need the `METH_RELEASE_KEYSTORE_PASSWORD` variable set in `~/.grade/gradle.properties`

## Architecture

The app is written using [React Native](https://facebook.github.io/react-native), with the desktop port done using [react-native-web](https://github.com/necolas/react-native-web).

### Web3 connection

Each browser tab has the following global object made available upon page load:

* `web3.currentProvider` - Dapps can [use this](https://github.com/MetaMask/faq/blob/master/detecting_metamask.md#deprecation-of-global-web3js) to initialise a connection that is able to communicate with the connected Ethereum node. 

_Note: Synchronous web3 calls are not supported._


## License

AGPLv3
