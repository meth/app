import { createHash } from 'crypto'
import { AsyncStorage } from 'react-native'

import logger from '../logger'

const log = logger.create('Storage')

/**
 * Writing to storage should be considered volatile, and storage calls should
 * be expected to fail at any time.
 */
class Storage {
  init ({ store }) {
    log.debug('Initializing ...')

    this._store = store
  }

  async setMnemonic (mnemonic) {
    const hash = createHash('sha256').update(mnemonic).digest('hex')

    log.info(`Set storage mnemonic ${hash} ...`)

    this._mnemonic = hash

    try {
      /* do these calls asynchronously */
      this.loadAddressNames()
      this.loadBookmarks()
      this.loadDappPermissions()
    } catch (err) {
      log.warn(err.toString())
    }
  }

  async setNetwork ({ description, genesisBlock } = {}) {
    log.info(`Set storage network: ${description} - ${genesisBlock} ...`)

    this._network = genesisBlock
  }

  async loadAddressNames () {
    log.info('Load address friendly names ...')

    const data = this._load(this._userKey('accountNames'))

    if (data) {
      this._store.actions.updateAddressNames(data)
    }
  }

  async loadBookmarks () {
    log.info('Load bookmarks ...')

    const data = this._load(this._userKey('bookmarks'))

    if (data) {
      this._store.actions.updateBookmarks(data)
    }
  }

  async loadDappPermissions () {
    log.info('Load dapp permissions ...')

    const data = this._load(this._userKey('dappPermissions'))

    if (data) {
      this._store.actions.updateDappPermissions(data)
    }
  }

  async _load (key) {
    log.debug(`Load key ${key} ...`)

    return AsyncStorage.getItem(key)
  }

  async _save (key, value) {
    log.debug(`Save key ${key} ...`)

    return AsyncStorage.setItem(key, value)
  }

  _userKey (key) {
    if (!this._canConstructUserKey()) {
      log.throw('Mnemonic and network need to be set')
    }

    return `${this._mnemonic}-${this._network}-${key}`
  }

  _canConstructUserKey () {
    return this._mnemonic
  }
}

export default new Storage()