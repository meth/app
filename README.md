# Meth Browser

The Meth dapp browser, for Ethereum addicts. **Work-in-progress**

## Development

Branches:
 * `dev` - Dev branch (default). Bleeding-edge code.
 * `master` - Production branch. Clean code, only approved pull requests allowed.

Requirements:
  * [Node.js 8+](http://nodejs.org)
  * [Yarn](yarnpkg.com)

Once Node is installed, install the dependencies:

```shell
$ yarn
```

Start a local Geth dev instance:

```shell
$ geth --dev --rpc
```

### Electron desktop app

To build frontend for development:

```shell
$ npm run web
```

To start the electron backend and full UI:

```shell
$ npm run electron
```
