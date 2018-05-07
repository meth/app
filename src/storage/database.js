import PouchDB from 'pouchdb-core'
import PouchDBAsyncStorageAdapter from 'pouchdb-adapter-asyncstorage'

import logger from '../logger'
import { sha256, encrypt, decrypt } from '../utils/crypto'

PouchDBAsyncStorageAdapter(PouchDB)



export default class Database {
  constructor (dbName, authKey, encryptionKey) {
    this._encryptionKey = encryptionKey
    this._dbName = `${authKey}-${dbName}`
    this._db = new PouchDB(this._dbName, { adapter: 'asyncstorage' })
    this._log = logger.create(dbName)
  }

  async destroy () {
    if (this._sync) {
      this._sync.cancel()
    }
  }

  async addOrUpdate (/* doc */) {
    throw new Error('Not yet implemented')
  }

  async remove (/* doc */) {
    throw new Error('Not yet implemented')
  }

  async _addOrUpdate (_id, data) {
    const finalDoc = {
      _id,
      data: this._encrypt(data)
    }

    const existing = await this._db.get(_id)
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

  async decrypt (str) {
    this._log.debug('decrypt')

    return decrypt(this._encryptionKey, str)
  }

  async _generateId (parts) {
    return sha256(parts)
  }
}
