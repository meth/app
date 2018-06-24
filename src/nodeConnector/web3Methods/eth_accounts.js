import PersonalListAccounts from './personal_listAccounts'

export default class EthAccounts extends PersonalListAccounts {
  constructor (config) {
    super(config, 'eth_accounts')
  }
}
