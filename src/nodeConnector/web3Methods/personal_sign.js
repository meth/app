import GenericMethod from './generic'
import { InvalidParamsError } from '../../utils/errors'

export default class PersonalSign extends GenericMethod {
  constructor (config, name = 'personal_sign') {
    super(config, name)
  }

  async run (params) {
    this._log.trace('Sign data', params)

    const [ data, address ] = params

    if (!address || !data) {
      throw new InvalidParamsError('address and data must be set')
    }

    return this._store.actions.signData(address, data)
  }
}
