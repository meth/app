import Bip39 from 'bip39'
import { Buffer } from 'buffer'

import { generateMnemonic, init, load, unload, wallet } from './manager'
import Wallet from './wallet'

jest.mock('bip39', () => require('method-mocks').setupMethodMocks())

jest.mock('../utils/crypto/random', () => numBytes => [ numBytes ], { virtual: true })

jest.mock('./wallet', () => {
  class MockWallet {
    constructor (app, mnemonic) {
      this._app = app
      this._mnemonic = mnemonic
      MockWallet._instances.push(this)
    }

    async init () {
      this._active = true
    }

    async destroy () {
      this._active = false
    }
  }

  MockWallet._instances = []

  return MockWallet
})



describe('generateMnemonic', () => {
  let generateSpy

  beforeEach(() => {
    Bip39.setMethodMock('generateMnemonic', (...args) => generateSpy(...args))
  })

  afterEach(() => {
    Bip39.clearAllMethodMocks()
  })

  it('returns a menmonic', async () => {
    generateSpy = jest.fn(() => 'abc def')

    const str = await generateMnemonic()

    expect(str).toEqual('abc def')

    expect(generateSpy).toHaveBeenCalledTimes(1)
    expect(generateSpy.mock.calls[0][0]).toEqual(256)

    const cb = generateSpy.mock.calls[0][1]
    const bytes = cb(1)
    expect(bytes).toBeInstanceOf(Buffer)
    expect(Array.from(bytes)).toEqual([ 64 ])
  })

  it('ensures there are no duplicates a menmonic', async () => {
    generateSpy = jest.fn()
      .mockImplementationOnce(() => 'abc abc')
      .mockImplementationOnce(() => 'abc def')

    const str = await generateMnemonic()

    expect(str).toEqual('abc def')

    expect(generateSpy).toHaveBeenCalledTimes(2)
  })
})


describe('.load()', () => {
  let store
  let nodeConnector

  beforeEach(() => {
    store = Math.random()
    nodeConnector = Math.random()
    init({ store, nodeConnector })
  })

  it('loads a new wallet', async () => {
    const w = await load('abc')

    expect(w).toBeInstanceOf(Wallet)
    expect(w._mnemonic).toEqual('abc')
    expect(w._app).toEqual({ store, nodeConnector })
    expect(w._active).toEqual(true)
    expect(wallet()).toEqual(w)
  })
})

describe('.unload()', () => {
  let store
  let nodeConnector

  beforeEach(() => {
    store = Math.random()
    nodeConnector = Math.random()
    init({ store, nodeConnector })
  })

  it('unloads existing wallet', async () => {
    const w = await load('abc')
    await unload()
    expect(w._active).toEqual(false)
    expect(wallet()).toEqual(null)
  })
})
