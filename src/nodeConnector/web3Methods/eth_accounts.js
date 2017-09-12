import GenericMethod from './generic'
import Wallet from '../../wallet'

export default class EthGetAccounts extends GenericMethod {
  constructor(nodeConnector) {
    super(nodeConnector, 'eth_accounts')
  }

  async run(params) {
    this._log.trace('Get accounts', params)

    return Wallet.getAccounts()
  }
}
