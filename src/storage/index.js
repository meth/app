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
    const hash = createHash('sha256').update(mnemonic).digest('hex')

    log.info(`Set storage mnemonic ${hash} ...`)

    this._mnemonic = hash
  }

  async setNetwork ({ description, genesisBlock } = {}) {
    log.info(`Set storage network: ${description} ...`)

    this._network = genesisBlock
  }

  async loadAccountNames () {
    return this._load(this._constructNetworkKey('accountNames'))
  }

  async _load (key) {
    log.debug(`Load key ${key} ...`)

    return AsyncStorage.getItem(key)
  }

  async _save (key, value) {
    log.debug(`Save key ${key} ...`)

    return AsyncStorage.setItem(key, value)
  }

  _constructNetworkKey (key) {
    if (!this._mnemonic || !this._network) {
      log.throw('Mnemonic and network need to be set')
    }

    return `${this._mnemonic}-${this._network}-${key}`
  }
}

export default new Storage()
