import GenericMethod from './generic'
import { InvalidParamsError } from '../../utils/errors'

export default class PersonalSendTransaction extends GenericMethod {
  constructor (config, name = 'personal_sendTransaction') {
    super(config, name)
  }

  async run (params) {
    this._log.trace('Send tx', params)

    const tx = params[0]

    // "From" must be set
    if (!tx.from) {
      throw new InvalidParamsError('from must be set')
    }

    // If "Value" is empty then set to 0
    if (!tx.value) {
      tx.value = 0
    }

    return this._store.actions.sendTransaction(tx)
  }
}
