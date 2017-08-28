import GenericMethod from './generic'
import controller from '../../redux/controller'


export default class EthGetAccounts extends GenericMethod {
  constructor (nodeConnector) {
    super(nodeConnector, 'eth_accounts')
  }

  async run (method, params) {
    this._log.trace('Ask ', params)

    const wallet = await controller.wallet.getCurrent()

    return wallet.addresses
  }
}
