import { AsyncStorage } from 'react-native'
import PouchDB from 'pouchdb-core'
import PouchDBAsyncStorageAdapter from 'pouchdb-adapter-asyncstorage'

import logger from '../logger'
import { sha256 } from '../utils/crypto'

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
  }

  async setMnemonic (mnemonic) {
    const hash = sha256(mnemonic)

    log.info(`Set storage mnemonic: ${hash} ...`)

    this._mnemonicHash = hash

    this.setupDatabases()
    this.loadUserData()
  }

  async setNetwork ({ description, genesisBlock } = {}) {
    if (!description && !genesisBlock) {
      log.info('Clear storage network key')
    } else {
      log.info(`Set storage network key: ${description} - ${genesisBlock} ...`)
    }

    this._network = genesisBlock

    this.setupDatabases()
    this.loadUserData()
  }

  /**
   * Setup db replication sync
   * @return {[type]} [description]
   */
  setupDatabases () {
    // cancel existing syncs
    if (this._db) {
      Object.keys(this._db).forEach(dbKey => {
        const { sync } = this._db[dbKey]

        sync.cancel()
      })
    }

    this._db = [
      'transactions',
      'addressBook',
      'bookmarks',
      'dappPermissions',
      'customTokens'
    ].reduce((ret, dbName) => {
      // eslint-disable-next-line no-param-reassign
      ret[dbName] = new PouchDB(this._dbKey(dbName), { adapter: 'asyncstorage' })
      return ret
    }, {})

    // this._dbSync = PouchDB.sync(dbKey, `${this._syncUrl}/${dbKey}`, {
    //   live: true,
    //   retry: true
    // }).on('change', info => {
    //   log.debug('db sync: change', info)
    // }).on('paused', err => {
    //   console.log('replication paused')
    // }).on('active', () => {
    //   console.log('replication resumed')
    // }).on('denied', err => {
    //   console.log('replication denied')
    // }).on('complete', info => {
    //   console.log('replication complete')
    // }).on('error', err => {
    //   console.log('replication error', err)
    // })
  }

  /**
   * Load app data (call this when app starts)
   */
  loadAppData () {
    this._loadlastConnectedNodeId()
  }

  /**
   * Load user data (call this once password and network has been set)
   */
  loadUserData () {
    this._loadUserData('addressBook', this._store.actions.injectAddressBook)
    this._loadUserData('bookmarks', this._store.actions.injectBookmarks)
    this._loadUserData(
      'dappPermissions',
      this._store.actions.injectDappPermissions
    )
    this._loadUserData('customTokens', this._store.actions.injectCustomTokens)
    this._loadUserData(
      'transactionHistory',
      this._store.actions.injectTransactionHistory
    )
  }

  async _loadUserData (key, onSuccess) {
    if (!this._canConstructUserKey()) {
      return
    }

    log.info(`Load ${key} ...`)

    const data = await this._load(this._userKey(key))

    if (data) {
      onSuccess(data)
    }
  }

  async _loadlastConnectedNodeId () {
    log.info('Load last connected node id ...')

    const data = await this._load('lastConnectedNodeId')

    if (data) {
      this._store.actions.injectLastConnectedNodeId(data)
    }
  }

  async saveTransactionHistory (data) {
    log.debug('Save transaction history ...', data)

    await this._save(this._userKey('transactionHistory'), data)
  }

  async saveDappPermissions (data) {
    log.debug('Save dapp permissions ...', data)

    await this._save(this._userKey('dappPermissions'), data)
  }

  async saveAddressBook (data) {
    log.debug('Save address book ...', data)

    await this._save(this._userKey('addressBook'), data)
  }

  async saveCustomTokens (data) {
    log.debug('Save custom tokens ...', data)

    await this._save(this._userKey('customTokens'), data)
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

  _userKey (key) {
    if (!this._canConstructUserKey()) {
      log.throw('Mnemonic and network need to be set')
    }

    return `${this._mnemonicHash}-${this._network}-${key}`
  }

  _canConstructUserKey () {
    return !!this._mnemonicHash && !!this._network
  }

  _dbKey (dbName) {
    if (!this._canConstructUserKey()) {
      return null
    }

    return `${this._mnemonicHash}-${this._network}-${dbName}`
  }
}

export default new Storage()
