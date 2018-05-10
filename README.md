# Meth Browser

[![Dev build Status](https://secure.travis-ci.org/meth-project/meth-browser.svg?branch=dev)](http://travis-ci.org/meth-project/meth-browser) (dev)
[![codecov](https://codecov.io/gh/meth-project/meth-browser/branch/dev/graph/badge.svg)](https://codecov.io/gh/meth-project/meth-browser)

The Meth Dapp browser, for Ethereum addicts.

**NOTE: This is unreleased, Alpha software, very much a work-in-progress**

Features:

* Cross-platform (Windows, Linux, Mac)
* Mnemonic-based HD wallet ([BIP44/EIP85](https://github.com/ethereum/EIPs/issues/85))
* Connects to local as well as remote Ethereum nodes

## Architecture

### Electron.js

The [Electron](http://electron.atom.io) layer launches the main window, which is running a
React.js app. All browser, connection and web3 logic is handled within this
window.

### Browser tabs

Browser tabs are actually [`WebView`](https://electron.atom.io/docs/api/webview-tag/) instances, and communicate back and
forth with the main browser window via asynchronous IPC.

Each browser tab has the following Javascript globals made available (via the
  [preload script](electron/preloader/browserTab.js)):

  * `web3` - a [web3](https://github.com/ethereum/web3.js) connection to the Ethereum network. Every tab gets
 its own connection instance. _Note: due to the security architecture,
 synchronous web3 calls are not supported_.
  * `Meth` - access to custom Meth APIs, e.g. creating a new account.

The web3 connections available to browser tabs is always connected, since any
node issues will be handled within the Browser app itself.

## Developer guide

**Branches**

 * `dev` - Dev branch (default). Bleeding-edge code.
 * `master` - Production branch. Clean code, only approved pull requests allowed.

**Setup and installation**

  * [Node.js 8.10.0](http://nodejs.org) **<- we recommend using this exact version!**
  * [Yarn 1.0+](yarnpkg.com)

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

Run `yarn setup:dev` to generate `appConfig.json`. Then edit the file and enter the

URL for your dev deployment of the [Meth backend](https://github.com/meth-browser/server). For example:

```js
{
  "mode": "development",
  "backend": "https://meth-server-atyyzvgfve.now.sh/db"
}
```

**Private Ethereum chain**

Start a local private Ethereum blockchain. We recommend using [Ganache](https://github.com/trufflesuite/ganache).

**Electron desktop app**

To build frontend for development:

```shell
$ yarn web
```

To start the electron backend and full UI:

```shell
$ yarn electron
```

**Unit tests**

To run the unit tests:

```shell
$ yarn test
```

To run with coverage:

```shell
$ yarn test-cov
```

### Code style (ESLint)

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
$ yarn package
```

The `packages` folder will contain the built output.

_Note: To run the built Linux executable on Ubuntu you will first need to do
`apt-get install libgconf-2-4`._



## License

AGPLv3
