import {
  setupAccountBalances,
  setupAccountFriendlyNames,
  setupBookmarks,
  setupDappPermissions,
  generateMnemonic,
  generateRawTransaction,
  sendRawTransaction,
  loadWallet,
  saveDappPermissions
} from './actionCreators'
import {
  ACCOUNT_BALANCES,
  ACCOUNT_FRIENDLY_NAMES,
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

describe('setupAccountBalances()', () => {
  it('returns action', () => {
    expect(setupAccountBalances(123)).toEqual({
      type: ACCOUNT_BALANCES,
      payload: 123
    })
  })
})

describe('setupAccountFriendlyNames()', () => {
  it('returns action', () => {
    expect(setupAccountFriendlyNames(123)).toEqual({
      type: ACCOUNT_FRIENDLY_NAMES,
      payload: 123
    })
  })
})

describe('setupBookmarks()', () => {
  it('returns action', () => {
    expect(setupBookmarks(123)).toEqual({
      type: BOOKMARKS,
      payload: 123
    })
  })
})

describe('setupDappPermissions()', () => {
  it('returns action', () => {
    expect(setupDappPermissions(123)).toEqual({
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
