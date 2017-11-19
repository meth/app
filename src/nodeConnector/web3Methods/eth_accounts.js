import GenericMethod from './generic'

export default class EthGetAccounts extends GenericMethod {
  constructor (config) {
    super(config, 'eth_accounts')
  }

  async run () {
    this._log.trace('Get accounts')

    return this._walletManager.wallet().getAddresses()
  }
}
