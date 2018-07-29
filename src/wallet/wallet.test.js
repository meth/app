import BigNumber from 'bignumber.js'
import EventEmitter from 'eventemitter3'
import { EthHdWallet } from 'eth-hd-wallet'

import { toHexStr } from '../utils/number'
import Wallet from './wallet'
import EVENT from '../../common/constants/events'
import STATE from '../../common/constants/states'

jest.mock('eth-hd-wallet', () => ({
  EthHdWallet: require('method-mocks').setupMethodMocks()
}))

describe('.init()', () => {
  let store
  let nodeConnector
  let w

  beforeEach(() => {
    store = {
      actions: {
        showConnectionModal: jest.fn()
      }
    }

    nodeConnector = new EventEmitter()

    w = new Wallet({ store, nodeConnector }, 'password')
    w._reload = jest.fn()
  })

  it('initializes the wallet and shows the connection modal if not yet connected', async () => {
    await w.init()

    expect(store.actions.showConnectionModal).toHaveBeenCalledTimes(1)
    expect(w._reload).not.toHaveBeenCalled()
  })

  it('initializes the wallet and reloads data if already connected', async () => {
    nodeConnector.isConnected = true

    await w.init()

    expect(store.actions.showConnectionModal).not.toHaveBeenCalled()
    expect(w._reload).toHaveBeenCalledTimes(1)
  })

  it('sets up a listener for connection state changes', async () => {
    w._onNodeConnectionStateChange = jest.fn()

    await w.init()

    nodeConnector.emit(EVENT.STATE_CHANGE, 123)

    expect(w._onNodeConnectionStateChange).toHaveBeenCalledTimes(1)
    expect(w._onNodeConnectionStateChange).toHaveBeenCalledWith(123)
  })

  it('sets up a listener for new blocks', async () => {
    w._onNewBlock = jest.fn()

    await w.init()

    nodeConnector.emit(EVENT.NEW_BLOCK, 123)

    expect(w._onNewBlock).toHaveBeenCalledTimes(1)
    expect(w._onNewBlock).toHaveBeenCalledWith(123)
  })
})

describe('.getAddresses', () => {
  let w

  beforeEach(() => {
    w = new Wallet({}, 'password')
  })

  it('gets wallet addresses', () => {
    w._hdWallet = {
      getAddresses: jest.fn(() => 123)
    }

    expect(w.getAddresses()).toEqual(123)
  })
})

describe('.getAddressBalances', () => {
  let w

  beforeEach(() => {
    w = new Wallet({}, 'password')
  })

  it('gets wallet addresses', () => {
    w._hdWallet = {
      getAddresses: jest.fn(() => [ 'a', 'b', 'c' ])
    }
    w._balances = [ 123, 456, 789 ]

    expect(w.getAddressBalances()).toEqual({
      a: 123,
      b: 456,
      c: 789
    })
  })
})

describe('.generateAddress', () => {
  let w

  beforeEach(() => {
    w = new Wallet({}, 'password')
  })

  it('fails it not loaded', () => {
    w._ensureLoaded = () => {
      throw new Error('test')
    }

    expect(() => w.generateAddress()).toThrow('test')
  })

  it('generates adddress and updates balances', () => {
    w._ensureLoaded = () => {}
    w._updateBalances = jest.fn()
    w._hdWallet = {
      generateAddresses: jest.fn(() => [ 'a', 'b', 'c' ])
    }

    expect(w.generateAddress()).toEqual('c')
    expect(w._updateBalances).toHaveBeenCalledTimes(1)
  })
})

describe('.signTransaction', () => {
  let w

  beforeEach(() => {
    w = new Wallet({}, 'password')
  })

  it('signs a transaction', async () => {
    w._hdWallet = {
      signTransaction: jest.fn(() => 123)
    }

    const tx = {
      nonce: 12,
      from: 'from1',
      to: 'to1',
      value: 1234,
      data: '0xdeadbeef',
      gasLimit: 21000,
      gasPrice: 10000000,
      chainId: '1337'
    }

    expect(await w.signTransaction(tx)).toEqual(123)
    expect(w._hdWallet.signTransaction).toHaveBeenCalledWith({
      nonce: 12,
      from: 'from1',
      to: 'to1',
      value: '0x4d2',
      data: '0xdeadbeef',
      gasLimit: '0x5208',
      gasPrice: '0x989680',
      chainId: 1337
    })
  })
})

describe('.signTransaction', () => {
  let w

  beforeEach(() => {
    w = new Wallet({}, 'password')
  })

  it('signs data', async () => {
    w._hdWallet = {
      sign: jest.fn(() => 123)
    }

    const payload = {
      address: 'addr1',
      data: 'data1'
    }

    expect(await w.signData(payload)).toEqual(123)
    expect(w._hdWallet.sign).toHaveBeenCalledWith(payload)
  })
})

describe('.recoverSignerPublicKey', () => {
  let w

  beforeEach(() => {
    w = new Wallet({}, 'password')
  })

  it('recover signer public key', async () => {
    w._hdWallet = {
      recoverSignerPublicKey: jest.fn(() => 123)
    }

    const payload = {
      signature: 'sig1',
      data: 'data1'
    }

    expect(await w.recoverSignerPublicKey(payload)).toEqual(123)
    expect(w._hdWallet.recoverSignerPublicKey).toHaveBeenCalledWith(payload)
  })
})

describe('._getBalance', () => {
  let w

  beforeEach(() => {
    w = new Wallet({}, 'password')
  })

  it('gets raw balances', async () => {
    w._nodeConnector = {
      rawCall: jest.fn(() => 123)
    }

    expect(await w._getBalance('addr1')).toEqual(123)
    expect(w._nodeConnector.rawCall).toHaveBeenCalledWith('eth_getBalance', [
      'addr1',
      'latest'
    ])
  })
})

describe('._onNodeConnectionStateChange', () => {
  let w

  beforeEach(() => {
    w = new Wallet({}, 'password')
    w._reload = jest.fn()
  })

  it('will reload data when node connected', async () => {
    w._onNodeConnectionStateChange(STATE.CONNECTED)

    expect(w._reload).toHaveBeenCalledTimes(1)
  })
})

describe('._onNewBlock', () => {
  let w

  beforeEach(() => {
    w = new Wallet({}, 'password')
    w._updateBalances = jest.fn()
  })

  it('does nothing if wallet not yet initialized', async () => {
    w._onNewBlock()

    expect(w._updateBalances).not.toHaveBeenCalled()
  })

  it('updates balances if wallet has been initialized', async () => {
    w._hdWallet = 1
    w._onNewBlock()

    expect(w._updateBalances).toHaveBeenCalledTimes(1)
  })
})

describe('._updateBalances', () => {
  let w
  let setBalanceResult

  beforeEach(() => {
    w = new Wallet({}, 'password')

    w._hdWallet = {
      getAddresses: jest.fn(() => [ 'abc', 'def' ])
    }

    let balance = 1
    w._getBalance = jest.fn(() => {
      balance += 1
      return balance
    })

    w._setBalancesAndNotifyStore = jest.fn(() => setBalanceResult)
  })

  it('updates balances', async () => {
    setBalanceResult = Promise.resolve()

    await w._updateBalances()

    expect(w._setBalancesAndNotifyStore).toHaveBeenCalledWith([ 2, 3 ])
    expect(w._getBalance).toHaveBeenCalledWith('abc')
    expect(w._getBalance).toHaveBeenCalledWith('def')
  })

  it('handles errors', async () => {
    setBalanceResult = Promise.reject(new Error('test'))

    await w._updateBalances()

    expect(w._setBalancesAndNotifyStore).toHaveBeenCalledWith([ 2, 3 ])
  })
})

describe('._setBalancesAndNotifyStore', () => {
  let w
  let store

  beforeEach(() => {
    store = {
      actions: {
        injectAccountBalances: jest.fn()
      }
    }

    w = new Wallet({ store }, 'password')

    w.getAddressBalances = jest.fn(() => 123)
  })

  it('sets new balances', async () => {
    expect.assertions(4)

    w._balances = 1

    await w._setBalancesAndNotifyStore([ '0xdeadbeef', '0xf00dba11' ])

    expect(w._balances).not.toEqual(1)

    w._balances.forEach(b => {
      expect(b).toBeInstanceOf(BigNumber)
    })

    expect(w._balances.map(toHexStr)).toEqual([ '0xdeadbeef', '0xf00dba11' ])
  })

  it('injects balances into store', async () => {
    await w._setBalancesAndNotifyStore([ '0xdeadbeef', '0xf00dba11' ])

    expect(store.actions.injectAccountBalances).toHaveBeenCalledWith(123)
  })
})

describe('._ensureLoaded', () => {
  let w

  beforeEach(() => {
    w = new Wallet({}, 'password')
  })

  it('throws if not loaded', () => {
    expect(() => w._ensureLoaded()).toThrow()
  })

  it('does not throw if loaded', () => {
    w._hdWallet = 123

    expect(() => w._ensureLoaded()).not.toThrow()
  })
})

describe('._reload', () => {
  let w
  let hdWallet

  beforeEach(() => {
    let addressCount = 0

    hdWallet = {
      generateAddresses: jest.fn(num => {
        const ret = []

        for (let i = 0; num > i; i += 1) {
          addressCount += 1
          ret.push(`addr${addressCount}`)
        }

        return ret
      }),
      getAddressCount: () => addressCount,
      discardAddresses: jest.fn()
    }

    EthHdWallet.setMethodMock('fromMnemonic', () => hdWallet)

    w = new Wallet({}, 'password')

    w._setBalancesAndNotifyStore = jest.fn()
  })

  it('will follow the BIP44 spec and check upto 20 addresses after the last one found with a balance before concluding search', async () => {
    let balanceCall = 0
    w._getBalance = jest.fn(() => {
      balanceCall += 1

      if (balanceCall === 20 || balanceCall === 40) {
        return '0x1'
      }

      return '0x0'
    })

    await w._reload()

    expect(hdWallet.generateAddresses).toHaveBeenCalledTimes(60)
    expect(hdWallet.getAddressCount()).toEqual(60)
    expect(hdWallet.discardAddresses).toHaveBeenCalledWith(20)
    expect(w._setBalancesAndNotifyStore).toHaveBeenCalledWith([
      /* eslint-disable quotes */
      '0x0',
      '0x0',
      '0x0',
      '0x0',
      '0x0',
      '0x0',
      '0x0',
      '0x0',
      '0x0',
      '0x0',
      '0x0',
      '0x0',
      '0x0',
      '0x0',
      '0x0',
      '0x0',
      '0x0',
      '0x0',
      '0x0',
      '0x1',
      '0x0',
      '0x0',
      '0x0',
      '0x0',
      '0x0',
      '0x0',
      '0x0',
      '0x0',
      '0x0',
      '0x0',
      '0x0',
      '0x0',
      '0x0',
      '0x0',
      '0x0',
      '0x0',
      '0x0',
      '0x0',
      '0x0',
      '0x1'
      /* eslint-enable quotes */
    ])
  })

  it('will atleast end up with one address if no balances found', async () => {
    w._getBalance = jest.fn(() => '0x0')

    await w._reload()

    expect(hdWallet.generateAddresses).toHaveBeenCalledTimes(20)
    expect(hdWallet.getAddressCount()).toEqual(20)
    expect(hdWallet.discardAddresses).toHaveBeenCalledWith(19)
    expect(w._setBalancesAndNotifyStore).toHaveBeenCalledWith([
      /* eslint-disable quotes */
      '0x0'
      /* eslint-enable quotes */
    ])
  })
})
