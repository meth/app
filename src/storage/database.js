import PouchDB from 'pouchdb-core'
import PouchDBAsyncStorageAdapter from 'pouchdb-adapter-asyncstorage'

import logger from '../logger'
import { sha256, encrypt, decrypt } from '../utils/crypto'

PouchDBAsyncStorageAdapter(PouchDB)

export default class Database {
  constructor (dbName, { storeInject, authKey, encryptionKey }) {
    this._storeInject = storeInject
    this._encryptionKey = encryptionKey
    this._dbName = `${authKey}-${dbName}`
    this._db = new PouchDB(this._dbName, { adapter: 'asyncstorage' })
    this._log = logger.create(`db-${dbName}`)

    this._log.info(`Setting up: ${this._dbName}`)

    this._reload()
  }

  async destroy () {
    if (this._sync) {
      this._sync.cancel()
    }
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
}
