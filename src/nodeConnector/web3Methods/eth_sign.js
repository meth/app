import PersonalSign from './personal_sign'

export default class EthSign extends PersonalSign {
  constructor (config) {
    super(config, 'eth_sign')
  }
}
