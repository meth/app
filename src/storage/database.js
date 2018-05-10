import PouchDB from 'pouchdb-core'
import PouchDBAsyncStorageAdapter from 'pouchdb-adapter-asyncstorage'
import PouchDBHttpAdapter from 'pouchdb-adapter-http'
import PouchDBReplication from 'pouchdb-replication'

import logger from '../logger'
import { sha256, encrypt, decrypt } from '../utils/crypto'
import { getBackendUrl } from '../config'

PouchDB.plugin(PouchDBReplication)
PouchDB.plugin(PouchDBHttpAdapter)
PouchDBAsyncStorageAdapter(PouchDB)

export default class Database {
  constructor (dbName, { storeInject, authKey, encryptionKey }) {
    this._storeInject = storeInject
    this._encryptionKey = encryptionKey
    this._dbName = `${authKey}-${dbName}`.toLowerCase() /* replication requires lowercase db names */
    this._db = new PouchDB(this._dbName, { adapter: 'asyncstorage' })
    this._log = logger.create(`db-${dbName}`)

    this._log.info(`Setting up: ${this._dbName}`)

    this._reload()

    this.startSync()
  }

  shutdown () {
    this.stopSync()
  }

  stopSync () {
    if (this._sync) {
      this._log.info('Stop sync ...')

      this._sync.cancel()
    }
  }

  startSync () {
    this.stopSync()

    this._log.info('Start sync ...')

    const backendUrl = `${getBackendUrl()}/${this._dbName}`

    this._db.replicate
      .from(backendUrl)
      .on('error', this._onReplicationError)
      .on('complete', () => {
        this._sync = PouchDB.sync(this._dbName, backendUrl, {
          live: true,
          retry: true,
          batch_size: 20
        })
          .on('error', this._onReplicationError)
          .on('change', ({ direction }) => {
            if ('pull' === direction) {
              this._log.debug('replication pull')
              this._reload()
            } else {
              this._log.debug('replication push')
            }
          })
          .on('paused', () => {
            this._log.trace('replication paused')
          })
          .on('active', () => {
            this._log.trace('replication resumed')
          })
          .on('denied', err => {
            this._log.warn('replication denied', err)
          })
          .on('complete', () => {
            this._log.debug('replication complete')
          })
      })
  }

  async loadAll () {
    return this._injectIntoStore(await this._db.allDocs())
  }

  async addOrUpdate (/* doc */) {
    throw new Error('Not yet implemented')
  }

  async remove (/* doc */) {
    throw new Error('Not yet implemented')
  }

  async _addOrUpdate (_id, data) {
    this._log.debug('add/update doc', _id, data)

    const finalDoc = {
      _id,
      data: await this._encrypt(data)
    }

    let existing
    try {
      existing = await this._db.get(_id)
    } catch (__) {
      /* existing item not found */
    }

    if (existing) {
      finalDoc._rev = existing._rev

      this._log.debug('update doc', _id)
    } else {
      this._log.debug('create doc', _id)
    }

    return this._db.put(finalDoc)
  }

  async _remove (_id) {
    this._log.debug('remove doc', _id)

    return this._db.remove(_id)
  }

  async _encrypt (data) {
    this._log.debug('encrypt')

    return encrypt(this._encryptionKey, data)
  }

  async _decrypt (str) {
    this._log.debug('decrypt', str)

    try {
      return decrypt(this._encryptionKey, str)
    } catch (err) {
      this._log.error('Decryption error', err)
    }

    return null
  }

  _generateId (parts) {
    return sha256(parts)
  }

  async _reload () {
    this._log.debug('reload')

    const { rows } = await this._db.allDocs()

    const decrypted = await Promise.all(
      rows.map(({ doc: { data } }) => this._decrypt(data))
    )

    this._storeInject(decrypted.filter(d => !!d))
  }

  _onReplicationError = err => {
    this._log.warn('replication error', err)
  }
}
