import GenericMethod from './generic'
import Wallet from '../../wallet'


export default class EthGetAccounts extends GenericMethod {
  constructor (nodeConnector) {
    super(nodeConnector, 'eth_accounts')
  }

  async run (method, params) {
    this._log.trace('Ask ', params)

    return Wallet.getAccounts()
  }
}
