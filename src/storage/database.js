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
    this._dbName = `${authKey}-${dbName}`.toLowerCase() /* Replication requires lowercase db names */
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

    const backendUrl = `${getBackendUrl()}/db/${this._dbName}`

    this._db.replicate
      .from(backendUrl)
      .on('error', this._onReplicationError)
      .on('complete', () => {
        this._sync = PouchDB.sync(this._dbName, backendUrl, {
          live: true,
          retry: true,
          batch_size: 20,
          back_off_function: delay => {
            // initial delay is 1 second
            if (0 === delay) {
              return 1000
            }

            /*
            On Android we need to ensure we don't exceed React Native's max
            timer delay, see https://github.com/facebook/react-native/issues/12981#issuecomment-292946311

            So we'll limit to 60seconds max.
             */
            return parseInt(Math.min(delay * 2, 60000), 10)
          }
        })
          .on('error', this._onReplicationError)
          .on('change', ({ direction }) => {
            if ('pull' === direction) {
              this._log.debug('Replication pull')
              this._reload()
            } else {
              this._log.debug('Replication push')
            }
          })
          .on('paused', () => {
            this._log.trace('Replication paused')
          })
          .on('active', () => {
            this._log.trace('Replication resumed')
          })
          .on('denied', err => {
            this._log.warn('Replication denied', err)
          })
          .on('complete', () => {
            this._log.debug('Replication complete')
          })
      })
  }

  async loadAll () {
    return this._reload()
  }

  async addOrUpdate (/* doc */) {
    throw new Error('Not yet implemented')
  }

  async remove (/* doc */) {
    throw new Error('Not yet implemented')
  }

  async _addOrUpdate (_id, data) {
    this._log.debug('add/update doc', _id, data)

    let encryptedData
    try {
      encryptedData = await this._encrypt(data)
    } catch (err) {
      this._log.error('Encrytion error, skipping addOrUpdate', err)

      return null
    }

    const finalDoc = {
      _id,
      data: encryptedData
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

    let existing
    try {
      existing = await this._db.get(_id)
    } catch (__) {
      return 0
    }

    return this._db.remove(existing)
  }

  async _encrypt (data) {
    this._log.debug('encrypt')

    return encrypt(this._encryptionKey, data)
  }

  async _decrypt (str) {
    this._log.debug('decrypt', str)

    return decrypt(this._encryptionKey, str)
  }

  _generateId (parts) {
    return sha256(parts)
  }

  async _reload () {
    this._log.debug('reload')

    const { rows } = await this._db.allDocs()

    let decrypted
    try {
      decrypted = await Promise.all(
        rows.map(({ doc: { data } }) => this._decrypt(data))
      )
    } catch (err) {
      this._log.error('Decryption error, skipping reload', err)

      return
    }

    this._storeInject(decrypted.filter(d => !!d))
  }

  _onReplicationError = err => {
    this._log.warn(`Replication error: ${err}`)
  }
}
