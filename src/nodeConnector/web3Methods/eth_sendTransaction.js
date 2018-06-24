import PersonalSendTransaction from './personal_sendTransaction'

export default class EthSendTransaction extends PersonalSendTransaction {
  constructor (config) {
    super(config, 'eth_sendTransaction')
  }
}
