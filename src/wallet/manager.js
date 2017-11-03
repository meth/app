import Mnemonic from 'bitcore-mnemonic'

import Wallet from './wallet'

const app = {
  store: null,
  nodeConnector: null
}

let currentWallet

export const init = ({ store, nodeConnector }) => {
  Object.assign(app, { store, nodeConnector })
}

/**
 * Generate new mnemonic
 * @return {String}
 */
export const generateMnemonic = async () =>
  new Mnemonic(Mnemonic.Words.ENGLISH).toString()

/**
 * Get current wallet
 */
export const wallet = () => currentWallet

/**
 * Unload current wallet.
 * @return {Promise}
 */
export const unload = async () => {
  await currentWallet.destroy()
  currentWallet = null
}

/**
 * Load wallet using given mnemonic
 * @param {String} mnemonic
 * @return {Promise}
 */
export const load = async mnemonic => {
  if (currentWallet) {
    await unload()
  }

  currentWallet = new Wallet(app, mnemonic)

  await currentWallet.init()

  return currentWallet
}
