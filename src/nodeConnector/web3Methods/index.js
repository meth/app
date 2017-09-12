/* eslint-disable camelcase */
import eth_accounts from './eth_accounts'
import eth_sendTransaction from './eth_sendTransaction'
import generic from './generic'

const MAPPING = { eth_accounts, eth_sendTransaction, generic }

export class Web3MethodFactory {
  constructor(nodeConnector) {
    this._connector = nodeConnector
    this._handlers = {}
  }

  getHandler(method) {
    if (!this._handlers[method]) {
      const Klass = MAPPING[method] || MAPPING.generic

      this._handlers[method] = new Klass(this._connector, method)
    }

    return this._handlers[method]
  }
}
