import { AsyncStorage } from 'react-native'

import logger from '../logger'
import { sha512 } from '../utils/crypto'
import AddressBook from './addressBook'
import CustomTokens from './customTokens'
import Transactions from './transactions'
import AppSettings from './appSettings'
import Bookmarks from './bookmarks'

const log = logger.create('Storage')

const DBCLASS = {
  addressBook: AddressBook,
  bookmarks: Bookmarks,
  customTokens: CustomTokens,
  transactions: Transactions,
  appSettings: AppSettings
}

const PER_NETWORK_DBS = [ 'transactions', 'addressBook', 'customTokens' ]
const PER_MNEMONIC_DBS = [ 'appSettings', 'bookmarks' ]

/**
 * Writing to storage should be considered volatile, and storage calls should
 * be expected to fail at any time.
 */
export class Storage {
  init ({ config, store }) {
    log.debug('Initializing ...')

    this._store = store
    this._syncUrl = config.getBackendUrl()
    this._db = {}
  }

  async setMnemonic (mnemonic) {
    log.info(`Set storage mnemonic ...`)

    this._mnemonic = mnemonic

    if (!this._mnemonic) {
      this.shutdownDatabases([ ...PER_MNEMONIC_DBS, ...PER_NETWORK_DBS ])
    } else {
      // if network is connected setup the network dbs too
      this.setupDatabases(
        PER_MNEMONIC_DBS.concat(this._network ? PER_NETWORK_DBS : [])
      )
    }
  }

  async setNetwork ({ description, genesisBlock } = {}) {
    if (!genesisBlock) {
      log.info('Clear storage network key')

      this.shutdownDatabases(PER_NETWORK_DBS)
    } else {
      log.info(`Set storage network key: ${description} - ${genesisBlock} ...`)

      this._network = genesisBlock

      this.setupDatabases(PER_NETWORK_DBS)
    }
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

  get appSettings () {
    return this._db.appSettings
  }

  get bookmarks () {
    return this._db.bookmarks
  }

  shutdownDatabases (dbKeys) {
    dbKeys.forEach(dbKey => {
      if (this._db[dbKey]) {
        log.info(`Shutdown database: ${dbKey} ...`)

        this._db[dbKey].shutdown()

        delete this._db[dbKey]
      }
    })
  }

  /**
   * Setup databases
   */
  setupDatabases (dbKeys) {
    if (!this._mnemonic) {
      return
    }

    if (dbKeys.length) {
      const key = sha512(this._mnemonic)
      const authKey = key.substr(0, 64)
      const encryptionKey = key.substr(64)

      this.shutdownDatabases(dbKeys)

      dbKeys.forEach(dbKey => {
        log.info(`Setup database: ${dbKey} ...`)

        this._db[dbKey] = new DBCLASS[dbKey](
          this._store,
          this._network,
          authKey,
          encryptionKey
        )
      })
    }
  }

  /**
   * Load app data (call this when app starts)
   */
  loadAppData () {
    this._loadlastConnectedNode()
  }

  async _loadlastConnectedNode () {
    log.info('Load last connected node ...')

    const data = await this._load('lastConnectedNode')

    if (data) {
      this._store.actions.injectLastConnectedNode(data)
    }
  }

  async saveLastConnectedNode (node) {
    log.debug('Save last connected node ...', node)

    await this._save('lastConnectedNode', node)
  }

  async _load (key) {
    log.debug(`Load: ${key} ...`)

    try {
      const json = await AsyncStorage.getItem(key)
      const ret = JSON.parse(json)
      log.debug(`...${key} load ok`)
      return ret
    } catch (err) {
      log.debug(`...${key} load error`)
      return undefined
    }
  }

  async _save (key, value) {
    log.debug(`Save: ${key} ...`)

    try {
      await AsyncStorage.setItem(key, JSON.stringify(value))
      log.debug(`...${key} save ok`)
    } catch (err) {
      log.debug(`...${key} save error`)
    }
  }
}

export default new Storage()
