import { AsyncStorage } from 'react-native'
import PouchDB from 'pouchdb-core'
import PouchDBAsyncStorageAdapter from 'pouchdb-adapter-asyncstorage'

import logger from '../logger'
import { sha512 } from '../utils/crypto'
import AddressBook from './addressBook'
import CustomTokens from './customTokens'
import Transactions from './transactions'
import AppSettings from './appSettings'

PouchDBAsyncStorageAdapter(PouchDB)

const log = logger.create('Storage')

/**
 * Writing to storage should be considered volatile, and storage calls should
 * be expected to fail at any time.
 */
class Storage {
  init ({ config, store }) {
    log.debug('Initializing ...')

    this._store = store
    this._syncUrl = config.getBackendUrl()
    this._db = {}
  }

  async setMnemonic (mnemonic) {
    log.info(`Set storage mnemonic ...`)

    this._mnemonic = mnemonic

    this.setupDatabases()
  }

  async setNetwork ({ description, genesisBlock } = {}) {
    if (!genesisBlock) {
      log.info('Clear storage network key')

      this.shutdownDatabases()
    } else {
      log.info(`Set storage network key: ${description} - ${genesisBlock} ...`)
    }

    this._network = genesisBlock

    this.setupDatabases()
  }

  get transactions () {
    return this._db.transactions
  }

  get addressBook () {
    return this._db.addressBook
  }

  get customTokens () {
    return this._db.customTokens
  }

  get settings () {
    return this._db.settings
  }

  shutdownDatabases () {
    log.info('Shutdown databases ...')

    Object.keys(this._db).forEach(dbKey => {
      this._db[dbKey].shutdown()
    })

    this._db = {}
  }

  /**
   * Setup databases
   */
  setupDatabases () {
    this.shutdownDatabases()

    if (!this._mnemonic || !this._network) {
      return
    }

    log.info('Setup databases ...')

    const key = sha512(this._mnemonic)
    const authKey = key.substr(0, 64)
    const encryptionKey = key.substr(64)

    const dbParams = [ this._store, this._network, authKey, encryptionKey ]

    this._db = {
      transactions: new Transactions(...dbParams),
      addressBook: new AddressBook(...dbParams),
      customTokens: new CustomTokens(...dbParams),
      appSettings: new AppSettings(...dbParams)
    }
  }

  /**
   * Load app data (call this when app starts)
   */
  loadAppData () {
    this._loadlastConnectedNodeId()
  }

  async _loadlastConnectedNodeId () {
    log.info('Load last connected node id ...')

    const data = await this._load('lastConnectedNodeId')

    if (data) {
      this._store.actions.injectLastConnectedNodeId(data)
    }
  }

  async saveLastConnectedNodeId (id) {
    log.debug('Save last connected node id ...', id)

    await this._save('lastConnectedNodeId', id)
  }

  async _load (key) {
    log.debug(`Load: ${key} ...`)

    const json = await AsyncStorage.getItem(key)

    try {
      return JSON.parse(json)
    } catch (err) {
      return undefined
    }
  }

  async _save (key, value) {
    log.debug(`Save: ${key} ...`)

    return AsyncStorage.setItem(key, JSON.stringify(value))
  }
}

export default new Storage()
