import Bip39 from 'bip39'

import Wallet from './wallet'
import { mnemonicToList } from '../utils/mnemonic'

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
export const generateMnemonic = async () => {
  const str = Bip39.generateMnemonic(256)

  // check for duplicates
  const words = {}
  let dupFound = false
  mnemonicToList(str).forEach(word => {
    if (words[word]) {
      dupFound = true
    }

    words[word] = true
  })

  if (dupFound) {
    // have another go if duplicate found
    return generateMnemonic()
  }

  return str
}

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
