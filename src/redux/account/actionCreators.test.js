import {
  injectAccountBalances,
  injectAddressBook,
  injectBookmarks,
  injectDappPermissions,
  generateMnemonic,
  generateRawTransaction,
  sendRawTransaction,
  loadWallet,
  saveDappPermissions
} from './actionCreators'
import {
  ACCOUNT_BALANCES,
  ADDRESS_BOOK,
  BOOKMARKS,
  DAPP_PERMISSIONS,
  SAVE_DAPP_PERMISSIONS,
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

describe('injectAccountBalances()', () => {
  it('returns action', () => {
    expect(injectAccountBalances(123)).toEqual({
      type: ACCOUNT_BALANCES,
      payload: 123
    })
  })
})

describe('injectAddressBook()', () => {
  it('returns action', () => {
    expect(injectAddressBook(123)).toEqual({
      type: ADDRESS_BOOK,
      payload: 123
    })
  })
})

describe('injectBookmarks()', () => {
  it('returns action', () => {
    expect(injectBookmarks(123)).toEqual({
      type: BOOKMARKS,
      payload: 123
    })
  })
})

describe('injectDappPermissions()', () => {
  it('returns action', () => {
    expect(injectDappPermissions(123)).toEqual({
      type: DAPP_PERMISSIONS,
      payload: 123
    })
  })
})

describe('saveDappPermissions()', () => {
  it('returns action', () => {
    expect(saveDappPermissions(123, { hello: 'world' })).toEqual({
      type: SAVE_DAPP_PERMISSIONS,
      payload: {
        dappId: 123,
        permissions: { hello: 'world' }
      }
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
