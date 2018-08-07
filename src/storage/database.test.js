import EventEmitter from 'eventemitter3'
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
  DummyPouchDB.sync = (...syncArgs) => {
    DummyPouchDB.syncArgs = syncArgs

    return new (require('eventemitter3'))()
  }
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

  describe('.startSync', () => {
    let emitter

    beforeEach(() => {
      emitter = new EventEmitter()

      d._db = {
        replicate: {
          from: jest.fn(() => emitter)
        }
      }

      d._onReplicationError = jest.fn()

      d.stopSync = jest.fn()
    })

    it('calls stopSync() first', () => {
      d.startSync()

      expect(d.stopSync).toHaveBeenCalled()
    })

    it('replicates from backend URL', () => {
      d.startSync()

      expect(d._db.replicate.from).toHaveBeenCalledWith(
        'https://example.com/db/authkey-test'
      )
    })

    it('handles replication errors', () => {
      d.startSync()

      emitter.emit('error', 'abc')

      expect(d._onReplicationError).toHaveBeenCalledWith('abc')
    })

    it('sets up syncer once replication completes', () => {
      d.startSync()

      d._sync = null
      emitter.emit('complete')

      expect(d._sync).toBeDefined()
    })

    describe('sets up syncer', () => {
      beforeEach(() => {
        d.startSync()
        emitter.emit('complete')
      })

      it('which is configured properly', () => {
        expect(PouchDB.syncArgs.length).toEqual(3)
        expect(PouchDB.syncArgs[0]).toEqual('authkey-test')
        expect(PouchDB.syncArgs[1]).toEqual(
          'https://example.com/db/authkey-test'
        )
        expect(PouchDB.syncArgs[2]).toMatchObject({
          live: true,
          retry: true,
          batch_size: 20
        })
      })

      it('with backOff delay limited to 60seconds', () => {
        const fn = PouchDB.syncArgs[2].back_off_function

        expect(fn(0)).toEqual(1000)
        expect(fn(20000)).toEqual(40000)
        expect(fn(30001)).toEqual(60000)
        expect(fn(60000)).toEqual(60000)
      })

      it('which handles sync errors', () => {
        d._sync.emit('error', 123)

        expect(d._onReplicationError).toHaveBeenCalledWith(123)
      })

      it('which handles sync pulls', () => {
        d._reload = jest.fn()

        d._sync.emit('change', { direction: 'pull' })

        expect(d._reload).toHaveBeenCalled()
      })

      it('which handles sync pushes', () => {
        d._reload = jest.fn()

        d._sync.emit('change', { direction: 'push' })

        expect(d._reload).not.toHaveBeenCalled()
      })

      it('which handles sync status changes', () => {
        d._log = {
          trace: jest.fn(),
          debug: jest.fn(),
          warn: jest.fn()
        }

        d._sync.emit('paused')
        expect(d._log.trace).toHaveBeenCalledWith('Replication paused')

        d._sync.emit('active')
        expect(d._log.trace).toHaveBeenCalledWith('Replication resumed')

        d._sync.emit('denied', 123)
        expect(d._log.warn).toHaveBeenCalledWith('Replication denied', 123)

        d._sync.emit('complete')
        expect(d._log.debug).toHaveBeenCalledWith('Replication complete')
      })
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
