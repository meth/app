import Mnemonic from 'bitcore-mnemonic'

import { EVENT } from '../../../../common/constants'
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

    Wallet.on(EVENT.NEW_BALANCES, this.wallet._onNewAccountBalances)
    await Wallet.load(mnemonic)
  },

  unload: async function () {
    this._log.debug('Unload current wallet')

    Wallet.removeListener(EVENT.NEW_BALANCES, this.wallet._onNewAccountBalances)
    await Wallet.unload()

    this._action(Actions.SET_MNEMONIC, null)
  },

  /**
   * Handler for new address balances event from wallet
   * @param  {Object} accountBalances
   */
  _onNewAccountBalances (accountBalances) {
    this._log.debug('Account balances updated')

    this._action(Actions.ACCOUNT_BALANCES, accountBalances)
  },
}
