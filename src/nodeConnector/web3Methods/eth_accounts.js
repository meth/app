import GenericMethod from './generic'

export default class EthGetAccounts extends GenericMethod {
  constructor (config) {
    super(config, 'eth_accounts')
  }

  async run (params) {
    this._log.trace('Get accounts', params)

    return this._walletManager.wallet().getAccounts()
  }
}
