import PouchDB from 'pouchdb-core'
import Crypto from '../utils/crypto'

import Database from './database'

jest.mock('pouchdb-core', () => {
  class DummyPouchDB {
    constructor (...args) {
      DummyPouchDB.constructorArgs = args
    }
  }
  DummyPouchDB.plugin = () => {}
  return DummyPouchDB
})
jest.mock('pouchdb-adapter-asyncstorage', () => () => {})
jest.mock('../utils/crypto', () => {
  const Krypto = require('method-mocks').setupMethodMocks({
    sha256: (...args) => Krypto._sha256(...args),
    encrypt: (...args) => Krypto._encrypt(...args),
    decrypt: (...args) => Krypto._decrypt(...args)
  })

  return Krypto
})
jest.mock('../config', () => ({ getBackendUrl: () => 'https://example.com' }))

describe('Database constructor', () => {
  let origReload
  let origStartSync

  beforeEach(() => {
    origReload = Database.prototype._reload
    origStartSync = Database.prototype.startSync

    Database.prototype._reload = jest.fn()
    Database.prototype.startSync = jest.fn()
  })

  afterEach(() => {
    Database.prototype._reload = origReload
    Database.prototype.startSync = origStartSync
  })

  it('sets up config, loads data and starts the sync', () => {
    const d = new Database('Test', {
      storeInject: 'storeInject',
      authKey: 'authKey',
      encryptionKey: 'encryptionKey'
    })

    expect(d._storeInject).toEqual('storeInject')
    expect(d._encryptionKey).toEqual('encryptionKey')
    expect(d._dbName).toEqual('authkey-test')
    expect(d._db).toBeInstanceOf(PouchDB)

    expect(Database.prototype._reload).toHaveBeenCalled()
    expect(Database.prototype.startSync).toHaveBeenCalled()

    expect(PouchDB.constructorArgs).toEqual([
      'authkey-test',
      { adapter: 'asyncstorage' }
    ])
  })
})

describe('Database', () => {
  let d
  let origReload
  let origStartSync

  beforeEach(() => {
    origReload = Database.prototype._reload
    origStartSync = Database.prototype.startSync

    Database.prototype._reload = jest.fn()
    Database.prototype.startSync = jest.fn()

    d = new Database('Test', {
      storeInject: 'storeInject',
      authKey: 'authKey',
      encryptionKey: 'encryptionKey'
    })

    d._reload = origReload
    d.startSync = origStartSync
  })

  afterEach(() => {
    Database.prototype._reload = origReload
    Database.prototype.startSync = origStartSync
  })

  describe('.shutdown', () => {
    it('calls stopSync', () => {
      d.stopSync = jest.fn()

      d.shutdown()

      expect(d.stopSync).toHaveBeenCalled()
    })
  })

  describe('.stopSync', () => {
    let sync

    beforeEach(() => {
      sync = { cancel: jest.fn() }
    })

    it('does nothing if sync not set', () => {
      d.stopSync()

      expect(sync.cancel).not.toHaveBeenCalled()
    })

    it('cancels sync if sync set', () => {
      d._sync = sync

      d.stopSync()

      expect(sync.cancel).toHaveBeenCalled()
    })
  })

  describe('.loadAll', () => {
    beforeEach(() => {
      d._reload = jest.fn(() => 123)
    })

    it('reloads all data', async () => {
      expect(await d.loadAll()).toEqual(123)
      expect(d._reload).toHaveBeenCalled()
    })
  })

  describe('._addOrUpdate', () => {
    let encryptResult
    let getResult

    beforeEach(() => {
      d._encrypt = jest.fn(() => encryptResult)
      d._db = {
        get: jest.fn(() => getResult),
        put: jest.fn(() => 123)
      }
    })

    it('returns null if encryption fails', async () => {
      encryptResult = Promise.reject(new Error('blah'))

      const result = await d._addOrUpdate('id', 'data')

      expect(result).toEqual(null)
      expect(d._encrypt).toHaveBeenCalledWith('data')
    })

    it('uses existing doc rev if found', async () => {
      encryptResult = Promise.resolve('abc')
      getResult = Promise.resolve({ _rev: 56 })

      const result = await d._addOrUpdate('id', 'data')

      expect(result).toEqual(123)
      expect(d._db.get).toHaveBeenCalledWith('id')
      expect(d._db.put).toHaveBeenCalledWith({
        _id: 'id',
        data: 'abc',
        _rev: 56
      })
    })

    it('does not override rev if existing doc not found', async () => {
      encryptResult = Promise.resolve('abc')
      getResult = Promise.reject(new Error('not found'))

      const result = await d._addOrUpdate('id', 'data')

      expect(result).toEqual(123)
      expect(d._db.get).toHaveBeenCalledWith('id')
      expect(d._db.put).toHaveBeenCalledWith({
        _id: 'id',
        data: 'abc'
      })
    })
  })

  describe('._remove', () => {
    let getResult

    beforeEach(() => {
      d._db = {
        get: jest.fn(() => getResult),
        remove: jest.fn(() => 123)
      }
    })

    it('returns 0 if not found', async () => {
      getResult = Promise.reject(new Error('test'))

      expect(await d._remove('id')).toEqual(0)

      expect(d._db.get).toHaveBeenCalledWith('id')
    })

    it('returns remove result if found', async () => {
      getResult = Promise.resolve(56)

      expect(await d._remove('id')).toEqual(123)

      expect(d._db.remove).toHaveBeenCalledWith(56)
    })
  })

  describe('._encrypt', () => {
    let spy

    beforeEach(() => {
      spy = Crypto.setMethodMock('_encrypt', jest.fn())
    })

    afterEach(() => {
      Crypto.clearAllMethodMocks()
    })

    it('encrypts data', async () => {
      await d._encrypt('data')

      expect(spy).toHaveBeenCalledWith('encryptionKey', 'data')
    })
  })

  describe('._decrypt', () => {
    let spy

    beforeEach(() => {
      spy = Crypto.setMethodMock('_decrypt', jest.fn())
    })

    afterEach(() => {
      Crypto.clearAllMethodMocks()
    })

    it('encrypts data', async () => {
      await d._decrypt('data')

      expect(spy).toHaveBeenCalledWith('encryptionKey', 'data')
    })
  })

  describe('._generateId', () => {
    let spy

    beforeEach(() => {
      spy = Crypto.setMethodMock('_sha256', jest.fn(() => 123))
    })

    afterEach(() => {
      Crypto.clearAllMethodMocks()
    })

    it('generates id', async () => {
      expect(await d._generateId('data')).toEqual(123)

      expect(spy).toHaveBeenCalledWith('data')
    })
  })

  describe('._reload', () => {
    beforeEach(() => {
      d._db = {
        allDocs: () =>
          Promise.resolve({
            rows: [ { doc: { data: 'abc' } }, { doc: { data: 'def' } } ]
          })
      }
      d._storeInject = jest.fn()
    })

    it('does not inject if decryption fails', async () => {
      d._decrypt = jest
        .fn()
        .mockImplementationOnce(() => Promise.resolve(123))
        .mockImplementationOnce(() => Promise.reject(new Error('e')))

      await d._reload()

      expect(d._storeInject).not.toHaveBeenCalled()

      expect(d._decrypt).toHaveBeenCalledWith('abc')
      expect(d._decrypt).toHaveBeenCalledWith('def')
    })

    it('injects filtered entries if decryption succeeds', async () => {
      d._decrypt = jest
        .fn()
        .mockImplementationOnce(() => Promise.resolve())
        .mockImplementationOnce(() => Promise.resolve(456))

      await d._reload()

      expect(d._storeInject).toHaveBeenCalledWith([ 456 ])
    })
  })

  describe('._onReplicationError', () => {
    it('logs warning', () => {
      d._log.warn = jest.fn()

      d._onReplicationError('test')

      expect(d._log.warn).toHaveBeenCalledWith('Replication error: test')
    })
  })
})
