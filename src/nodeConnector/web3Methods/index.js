import generic from './generic'
/* eslint-disable camelcase */
import eth_accounts from './eth_accounts'
import eth_sendTransaction from './eth_sendTransaction'
import eth_sign from './eth_sign'
import personal_ecRecover from './personal_ecRecover'
import personal_listAccounts from './personal_listAccounts'
import personal_sendTransaction from './personal_sendTransaction'
import personal_sign from './personal_sign'
/* eslint-enable camelcase */


const MAPPING = {
  eth_accounts,
  eth_sendTransaction,
  eth_sign,
  personal_sign,
  personal_ecRecover,
  personal_listAccounts,
  personal_sendTransaction,
  generic
}

export class Web3MethodFactory {
  constructor ({ nodeConnector, walletManager, store }) {
    this._nodeConnector = nodeConnector
    this._walletManager = walletManager
    this._store = store
    this._handlers = {}
  }

  getHandler (method) {
    if (!this._handlers[method]) {
      const Klass = MAPPING[method] || MAPPING.generic

      this._handlers[method] = new Klass({
        nodeConnector: this._nodeConnector,
        walletManager: this._walletManager,
        store: this._store
      }, method)
    }

    return this._handlers[method]
  }
}
