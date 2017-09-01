import Mnemonic from 'bitcore-mnemonic'

import { Actions } from '../../actions'
import Wallet from '../../../wallet'


module.exports = {
  generateNewMnemonic: function () {
    this._log.debug('Generate new mnemonic')

    return new Mnemonic(Mnemonic.Words.ENGLISH).toString()
  },

  loadUsingMnemonic: async function (mnemonic) {
    this._log.debug('Load wallet using mnemonic')

    this._action(Actions.SET_MNEMONIC, mnemonic)

    Wallet.load(mnemonic)
  },

  unload: async function () {
    this._log.debug('Unload current wallet')

    await Wallet.unload()

    this._action(Actions.SET_MNEMONIC, null)
  },
}
