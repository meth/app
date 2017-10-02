import Mnemonic from 'bitcore-mnemonic'

import Wallet from './wallet'

const app = {
  store: null,
  nodeConnector: null
}

export const init = ({ store, nodeConnector }) => {
  Object.assign(app, { store, nodeConnector })
}

/**
 * Generate new mnemonic
 * @return {String}
 */
export const generateNewMnemonic = () =>
  new Mnemonic(Mnemonic.Words.ENGLISH).toString()

/**
 * Load wallet using given mnemonic
 * @param {String} mnemonic
 * @return {Promise}
 */
export const load = async mnemonic => {
  const wallet = new Wallet(app, mnemonic)

  await wallet.init()

  return wallet
}

/**
 * Unload given wallet.
 * @param {Wallet} wallet
 * @return {Promise}
 */
export const unload = async wallet => {
  await wallet.destroy()
}
