import {
  updateAddressBalances,
  updateAddressNames,
  updateBookmarks,
  updateDappPermissions,
  generateMnemonic,
  generateRawTransaction,
  sendRawTransaction,
  loadWallet
} from './actionCreators'
import {
  ADDRESS_BALANCES,
  ADDRESS_NAMES,
  BOOKMARKS,
  DAPP_PERMISSIONS,
  SEND_RAW_TX,
  GENERATE_RAW_TX,
  LOAD_WALLET,
  GENERATE_MNEMONIC
} from './actions'

describe('loadWallet()', () => {
  it('returns action', () => {
    expect(loadWallet(123)).toEqual({
      type: LOAD_WALLET,
      payload: 123
    })
  })
})

describe('generateMnemonic()', () => {
  it('returns action', () => {
    expect(generateMnemonic(123)).toEqual({
      type: GENERATE_MNEMONIC,
      payload: 123
    })
  })
})

describe('updateAddressBalances()', () => {
  it('returns action', () => {
    expect(updateAddressBalances(123)).toEqual({
      type: ADDRESS_BALANCES,
      payload: 123
    })
  })
})

describe('updateAddressNames()', () => {
  it('returns action', () => {
    expect(updateAddressNames(123)).toEqual({
      type: ADDRESS_NAMES,
      payload: 123
    })
  })
})

describe('updateBookmarks()', () => {
  it('returns action', () => {
    expect(updateBookmarks(123)).toEqual({
      type: BOOKMARKS,
      payload: 123
    })
  })
})

describe('updateDappPermissions()', () => {
  it('returns action', () => {
    expect(updateDappPermissions(123)).toEqual({
      type: DAPP_PERMISSIONS,
      payload: 123
    })
  })
})

describe('generateRawTransaction()', () => {
  it('returns action', () => {
    expect(generateRawTransaction(123)).toEqual({
      type: GENERATE_RAW_TX,
      payload: 123
    })
  })
})

describe('sendRawTransaction()', () => {
  it('returns action', () => {
    expect(sendRawTransaction(123)).toEqual({
      type: SEND_RAW_TX,
      payload: 123
    })
  })
})
