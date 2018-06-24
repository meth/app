import GenericMethod from './generic'
import { InvalidParamsError } from '../../utils/errors'

export default class PersonalEcRecover extends GenericMethod {
  constructor (config, name = 'personal_ecRecover') {
    super(config, name)
  }

  async run (params) {
    this._log.trace('Recover public key of data signer', params)

    const [ message, signature ] = params

    if (!message || !signature) {
      throw new InvalidParamsError('message and signature must be set')
    }

    return this._walletManager.wallet().recoverSignerPublicKey({
      data: message,
      signature
    })
  }
}
