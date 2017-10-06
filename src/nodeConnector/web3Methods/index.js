/* eslint-disable camelcase */
import eth_accounts from './eth_accounts'
import eth_sendTransaction from './eth_sendTransaction'
/* eslint-enable camelcase */
import generic from './generic'

const MAPPING = { eth_accounts, eth_sendTransaction, generic }

export class Web3MethodFactory {
  constructor ({ nodeConnector, walletManager }) {
    this._connector = nodeConnector
    this._walletManager = walletManager
    this._handlers = {}
  }

  getHandler (method) {
    if (!this._handlers[method]) {
      const Klass = MAPPING[method] || MAPPING.generic

      this._handlers[method] = new Klass({
        connector: this._connector,
        walletManager: this._walletManager
      }, method)
    }

    return this._handlers[method]
  }
}
