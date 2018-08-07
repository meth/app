import { AsyncStorage } from 'react-native'

import storage, { Storage } from './'
import Crypto from '../utils/crypto'
import AddressBook from './addressBook'
import CustomTokens from './customTokens'
import Transactions from './transactions'
import AppSettings from './appSettings'
import Bookmarks from './bookmarks'

const PER_NETWORK_DBS = [ 'transactions', 'addressBook', 'customTokens' ]
const PER_MNEMONIC_DBS = [ 'appSettings', 'bookmarks' ]

jest.mock('react-native', () => ({
  AsyncStorage: require('method-mocks').setupMethodMocks()
}))
jest.mock('pouchdb-adapter-asyncstorage', () => () => {})
jest.mock('../utils/crypto', () => {
  const Krypto = require('method-mocks').setupMethodMocks({
    sha512: (...args) => Krypto._sha512(...args)
  })

  return Krypto
})
jest.mock(
  './addressBook',
  () =>
    class Klass {
      constructor (...args) {
        Klass.last = args
      }
    }
)
jest.mock(
  './customTokens',
  () =>
    class Klass {
      constructor (...args) {
        Klass.last = args
      }
    }
)
jest.mock(
  './transactions',
  () =>
    class Klass {
      constructor (...args) {
        Klass.last = args
      }
    }
)
jest.mock(
  './appSettings',
  () =>
    class Klass {
      constructor (...args) {
        Klass.last = args
      }
    }
)
jest.mock(
  './bookmarks',
  () =>
    class Klass {
      constructor (...args) {
        Klass.last = args
      }
    }
)

describe('default export', () => {
  it('is an instance of Storage', () => {
    expect(storage).toBeInstanceOf(Storage)
  })
})

describe('Storage', () => {
  let s

  beforeEach(() => {
    s = new Storage()
  })

  describe('.init', () => {
    it('initializes storage', () => {
      s.init({
        config: {
          getBackendUrl: () => 'url'
        },
        store: 2
      })

      expect(s._store).toEqual(2)
      expect(s._syncUrl).toEqual('url')
      expect(s._db).toEqual({})
    })
  })

  describe('.setMnemonic', () => {
    beforeEach(() => {
      s.shutdownDatabases = jest.fn()
      s.setupDatabases = jest.fn()
    })

    it('shuts down all dbs if mnemonic is cleared', async () => {
      await s.setMnemonic()

      expect(s.shutdownDatabases).toHaveBeenCalledWith(
        PER_MNEMONIC_DBS.concat(PER_NETWORK_DBS)
      )
      expect(s.setupDatabases).not.toHaveBeenCalled()
    })

    it('sets up per-mnemonic dbs if mnemonic is set', async () => {
      await s.setMnemonic('password')

      expect(s.setupDatabases).toHaveBeenCalledWith(PER_MNEMONIC_DBS)
      expect(s.shutdownDatabases).not.toHaveBeenCalled()
    })

    it('sets up per-network dbs if network is also already set', async () => {
      s._network = 1

      await s.setMnemonic('password')

      expect(s.setupDatabases).toHaveBeenCalledWith(
        PER_MNEMONIC_DBS.concat(PER_NETWORK_DBS)
      )
      expect(s.shutdownDatabases).not.toHaveBeenCalled()
    })
  })

  describe('.setNetwork', () => {
    beforeEach(() => {
      s.shutdownDatabases = jest.fn()
      s.setupDatabases = jest.fn()
    })

    it('shuts down network-based dbs if network is cleared', async () => {
      await s.setNetwork()

      expect(s.shutdownDatabases).toHaveBeenCalledWith(PER_NETWORK_DBS)
      expect(s.setupDatabases).not.toHaveBeenCalled()
    })

    it('sets up per-network dbs if network is set', async () => {
      await s.setNetwork({ genesisBlock: 1 })

      expect(s.setupDatabases).toHaveBeenCalledWith(PER_NETWORK_DBS)
      expect(s.shutdownDatabases).not.toHaveBeenCalled()
    })
  })

  describe('db getters', () => {
    it('work', () => {
      s._db = {
        transactions: 1,
        addressBook: 2,
        customTokens: 3,
        appSettings: 4,
        bookmarks: 5
      }

      expect(s.transactions).toEqual(1)
      expect(s.addressBook).toEqual(2)
      expect(s.customTokens).toEqual(3)
      expect(s.appSettings).toEqual(4)
      expect(s.bookmarks).toEqual(5)
    })
  })

  describe('.shutdownDatabases', () => {
    it('shuts down dbs which are set', () => {
      const dummy = { shutdown: jest.fn() }

      s._db = { dummy }

      s.shutdownDatabases([ 'test', 'dummy' ])

      expect(dummy.shutdown).toHaveBeenCalled()
      expect(s._db).toEqual({})
    })
  })

  describe('.setupDatabases', () => {
    let sha512spy
    let hash

    beforeEach(() => {
      s._store = 'store'
      s._network = 'network'
      s._db = {}
      s._mnemonic = 'abc def'

      s.shutdownDatabases = jest.fn()

      hash = ''
      for (let i = 0; 128 > i; i += 1) {
        hash += '123456789abcdef'.charAt(parseInt(Math.random() * 15, 10))
      }

      sha512spy = Crypto.setMethodMock('_sha512', jest.fn(() => hash))
    })

    it('does nothing if mnemonic not set', () => {
      delete s._mnemonic

      s.setupDatabases([ 'transactions', 'customTokens' ])

      expect(s._db).toEqual({})
      expect(s.shutdownDatabases).not.toHaveBeenCalled()
    })

    it('sets up dbs', () => {
      const dbs = [
        'addressBook',
        'customTokens',
        'transactions',
        'appSettings',
        'bookmarks'
      ]

      s.setupDatabases(dbs)

      expect(sha512spy).toHaveBeenCalledWith('abc def')

      expect(s.shutdownDatabases).toHaveBeenCalledWith(dbs)

      expect(s._db.addressBook).toBeInstanceOf(AddressBook)
      expect(AddressBook.last).toEqual([
        'store',
        'network',
        hash.substr(0, 64),
        hash.substr(64)
      ])

      expect(s._db.customTokens).toBeInstanceOf(CustomTokens)
      expect(CustomTokens.last).toEqual([
        'store',
        'network',
        hash.substr(0, 64),
        hash.substr(64)
      ])

      expect(s._db.transactions).toBeInstanceOf(Transactions)
      expect(Transactions.last).toEqual([
        'store',
        'network',
        hash.substr(0, 64),
        hash.substr(64)
      ])

      expect(s._db.appSettings).toBeInstanceOf(AppSettings)
      expect(AppSettings.last).toEqual([
        'store',
        'network',
        hash.substr(0, 64),
        hash.substr(64)
      ])

      expect(s._db.bookmarks).toBeInstanceOf(Bookmarks)
      expect(Bookmarks.last).toEqual([
        'store',
        'network',
        hash.substr(0, 64),
        hash.substr(64)
      ])
    })
  })

  describe('.loadAppData', () => {
    beforeEach(() => {
      s._loadlastConnectedNode = jest.fn()
    })

    it('loads app data', () => {
      s.loadAppData()

      expect(s._loadlastConnectedNode).toHaveBeenCalled()
    })
  })

  describe('._loadlastConnectedNode', () => {
    let loadResult

    beforeEach(() => {
      s._load = () => loadResult
      s._store = {
        actions: {
          injectLastConnectedNode: jest.fn()
        }
      }
    })

    it('does not inject into store if data unavailable', async () => {
      loadResult = Promise.resolve()

      await s._loadlastConnectedNode()

      expect(s._store.actions.injectLastConnectedNode).not.toHaveBeenCalled()
    })

    it('injects into store if data available', async () => {
      loadResult = Promise.resolve(123)

      await s._loadlastConnectedNode()

      expect(s._store.actions.injectLastConnectedNode).toHaveBeenCalledWith(123)
    })
  })

  describe('.saveLastConnectedNode', () => {
    it('saves the data', async () => {
      s._save = jest.fn(() => Promise.resolve())

      await s.saveLastConnectedNode(123)

      expect(s._save).toHaveBeenCalledWith('lastConnectedNode', 123)
    })
  })

  describe('._load', () => {
    let getItemSpy
    let getItemResult

    beforeEach(() => {
      getItemSpy = AsyncStorage.setMethodMock('getItem', jest.fn(() => getItemResult))
    })

    afterEach(() => {
      AsyncStorage.clearAllMethodMocks()
    })

    it('returns undefined if failed to load', async () => {
      getItemResult = Promise.reject(new Error('test'))

      const result = await s._load('key')

      expect(getItemSpy).toHaveBeenCalledWith('key')
      expect(result).toBeUndefined()
    })

    it('returns undefined if failed to parse JSON', async () => {
      getItemResult = Promise.resolve([])

      const result = await s._load('key')

      expect(getItemSpy).toHaveBeenCalledWith('key')
      expect(result).toBeUndefined()
    })

    it('returns result if valid', async () => {
      getItemResult = Promise.resolve(JSON.stringify({ a: 1 }))

      const result = await s._load('key')

      expect(getItemSpy).toHaveBeenCalledWith('key')
      expect(result).toEqual({ a: 1 })
    })
  })

  describe('._save', () => {
    let setItemSpy
    let setItemResult

    beforeEach(() => {
      setItemSpy = AsyncStorage.setMethodMock('setItem', jest.fn(() => setItemResult))
    })

    afterEach(() => {
      AsyncStorage.clearAllMethodMocks()
    })

    it('handles failed saves by catching errors', async () => {
      setItemResult = Promise.reject(new Error('test'))

      await s._save('key', 123)

      expect(setItemSpy).toHaveBeenCalledWith('key', JSON.stringify(123))
    })

    it('handles successful saves', async () => {
      setItemResult = Promise.resolve()

      await s._save('key', 123)

      expect(setItemSpy).toHaveBeenCalledWith('key', JSON.stringify(123))
    })
  })
})
