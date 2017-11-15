import Immutable from 'immutable'

import { createAction } from '../utils'
import fn from './middleware'
import { SEND_RAW_TX, GENERATE_RAW_TX, GENERATE_MNEMONIC, LOAD_WALLET } from './actions'

describe('wallet middleware', () => {
  it('passes actions through', async () => {
    const next = jest.fn()

    const handler = fn({})()(next)

    const action = createAction('blah')

    await handler(action)

    expect(next).toHaveBeenCalledTimes(1)
    expect(next).toHaveBeenCalledWith(action)
  })

  describe('processes the LOAD_WALLET action', () => {
    it('and loads the wallet using the mnemonic', async () => {
      const next = jest.fn(() => Promise.resolve(123))

      const walletManager = {
        load: jest.fn(() => Promise.resolve())
      }

      const handler = fn({ walletManager })()(next)

      const action = createAction(LOAD_WALLET, 'testMnemonic')

      const ret = await handler(action)

      expect(ret).toEqual(123)
      expect(walletManager.load).toHaveBeenCalledWith('testMnemonic')
      expect(next).toHaveBeenCalledWith(action)
    })
  })

  describe('processes the GENERATE_RAW_TX action', () => {
    it('and returns the raw tx string', async () => {
      const next = jest.fn()

      const state = {
        node: Immutable.Map({
          connection: {
            network: {
              chainId: 123
            }
          }
        })
      }

      const store = {
        getState: () => state
      }

      const nodeConnector = {
        rawCall: jest.fn(() => Promise.resolve(2))
      }

      const wallet = {
        sign: jest.fn(() => Promise.resolve('signed1'))
      }

      const walletManager = {
        wallet: () => wallet
      }

      const handler = fn({ nodeConnector, walletManager })(store)(next)

      const action = createAction(GENERATE_RAW_TX, {
        from: 'from1',
        to: 'to1',
        value: 3,
        data: 'data1',
        gasLimit: 17,
        gasPrice: 45
      })

      const ret = await handler(action)

      expect(ret).toEqual('signed1')
      expect(wallet.sign).toHaveBeenCalledWith({
        from: 'from1',
        to: 'to1',
        value: 3,
        data: 'data1',
        nonce: 2,
        chainId: 123,
        gasLimit: 17,
        gasPrice: 45
      })
      expect(nodeConnector.rawCall).toHaveBeenCalledWith('eth_getTransactionCount', [ 'from1', 'latest' ])
      expect(next).not.toHaveBeenCalledWith(action)
    })
  })

  describe('processes the GENERATE_MNEMONIC action', () => {
    it('and passes the call through to the wallet manager', async () => {
      const next = jest.fn()

      const walletManager = {
        generateMnemonic: jest.fn(() => Promise.resolve(123))
      }

      const handler = fn({ walletManager })()(next)

      const ret = await handler(createAction(GENERATE_MNEMONIC))

      expect(ret).toEqual(123)
      expect(next).not.toHaveBeenCalled()
    })
  })

  describe('processes the SEND_RAW_TX action', () => {
    it('and it passes the call to the node connector', async () => {
      const next = jest.fn()

      const nodeConnector = {
        rawCall: jest.fn(() => Promise.resolve(123))
      }

      const handler = fn({ nodeConnector })()(next)

      const action = createAction(SEND_RAW_TX, 'test')

      const ret = await handler(action)

      expect(ret).toEqual(123)
      expect(nodeConnector.rawCall).toHaveBeenCalledWith('eth_sendRawTransaction', [ 'test' ])
      expect(next).toHaveBeenCalledWith(createAction(SEND_RAW_TX, 123))
    })
  })
})
