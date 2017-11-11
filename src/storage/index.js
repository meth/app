import { createHash } from 'crypto'
import { AsyncStorage } from 'react-native'

import logger from '../logger'

const log = logger.create('Storage')

/**
 * Writing to storage should be considered volatile, and storage calls should
 * be expected to fail at any time.
 */
class Storage {
  async setMnemonic (mnemonic) {
    this._mnemonic = createHash('sha256').update(mnemonic).digest('hex')
  }

  async setNetwork ({ genesisBlock } = {}) {
    this._network = genesisBlock
  }

  async loadAccountNames () {
    return this._load('accountNames')
  }

  async _load (key) {
    const fullKey = this._constructKey(key)

    log.debug(`Load key ${fullKey} ...`)

    return AsyncStorage.getItem(fullKey)
  }

  async _save (key, value) {
    const fullKey = this._constructKey(key)

    log.debug(`Save key ${fullKey} ...`)

    return AsyncStorage.setItem(fullKey, value)
  }

  _constructKey (key) {
    if (!this._mnemonic || !this._network) {
      log.throw('Mnemonic and network need to be set')
    }

    return `${this._mnemonic}-${this._network}-${key}`
  }
}

export default new Storage()
