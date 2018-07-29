import storage, { Storage } from './'

const PER_NETWORK_DBS = [ 'transactions', 'addressBook', 'customTokens' ]
const PER_MNEMONIC_DBS = [ 'appSettings', 'bookmarks' ]

jest.mock('pouchdb-adapter-asyncstorage', () => () => {})
jest.mock('../utils/crypto', () => require('method-mocks').setupMethodMocks())

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

      expect(s.shutdownDatabases).toHaveBeenCalledWith(PER_MNEMONIC_DBS.concat(PER_NETWORK_DBS))
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

      expect(s.setupDatabases).toHaveBeenCalledWith(PER_MNEMONIC_DBS.concat(PER_NETWORK_DBS))
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
})
