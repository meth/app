import Mnemonic from 'bitcore-mnemonic'

import { EVENT } from '../../../../common/constants'
import MODALS from '../../../utils/modals'
import { Actions } from '../../actions'
import Wallet from '../../../wallet'

export function generateNewMnemonic() {
  this._log.debug('Generate new mnemonic')

  return new Mnemonic(Mnemonic.Words.ENGLISH).toString()
}

export async function loadUsingMnemonic(mnemonic) {
  this._log.debug('Load wallet using mnemonic')

  this._action(Actions.SET_MNEMONIC, mnemonic)

  Wallet.addListener(EVENT.NEW_BALANCES, this.wallet._onNewAccountBalances)
  await Wallet.load(mnemonic)
}

export async function unload() {
  this._log.debug('Unload current wallet')

  Wallet.removeListener(EVENT.NEW_BALANCES, this.wallet._onNewAccountBalances)
  await Wallet.unload()

  this._action(Actions.SET_MNEMONIC, null)
}

/**
 * Send transaction
 * @param  {Object} tx Tx params
 * @return {Promise} Resolves once successfully sent
 */
export function sendTransaction(tx) {
  let promiseResolver

  const promise = new Promise((resolve, reject) => {
    promiseResolver = { resolve, reject }
  })

  const { sendTransaction: sendTx } = this._getState('wallet')

  // if a transaction is already being processed do nothing
  if (!sendTx) {
    this._action(Actions.SEND_TRANSACTION, {
      tx,
      promiseResolver
    })

    this.modals.show(MODALS.SEND_TRANSACTION)
  }

  return promise
}
