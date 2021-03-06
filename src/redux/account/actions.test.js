import {
  ACCOUNT_BALANCES,
  ADDRESS_BOOK,
  BOOKMARKS,
  DAPP_PERMISSIONS,
  SEND_RAW_TX,
  GENERATE_RAW_TX,
  LOAD_WALLET,
  GENERATE_MNEMONIC,
  SAVE_DAPP_PERMISSIONS
} from './actions'

describe('ADDRESS_BOOK', () => {
  it('is defined', () => {
    expect(ADDRESS_BOOK).toBeDefined()
  })
})

describe('ACCOUNT_BALANCES', () => {
  it('is defined', () => {
    expect(ACCOUNT_BALANCES).toBeDefined()
  })
})

describe('BOOKMARKS', () => {
  it('is defined', () => {
    expect(BOOKMARKS).toBeDefined()
  })
})

describe('DAPP_PERMISSIONS', () => {
  it('is defined', () => {
    expect(DAPP_PERMISSIONS).toBeDefined()
  })
})

describe('SAVE_DAPP_PERMISSIONS', () => {
  it('is defined', () => {
    expect(SAVE_DAPP_PERMISSIONS).toBeDefined()
  })
})

describe('GENERATE_MNEMONIC', () => {
  it('is defined', () => {
    expect(GENERATE_MNEMONIC).toBeDefined()
  })
})

describe('GENERATE_RAW_TX', () => {
  it('is defined', () => {
    expect(GENERATE_RAW_TX).toBeDefined()
  })
})

describe('SEND_RAW_TX', () => {
  it('is defined', () => {
    expect(SEND_RAW_TX).toBeDefined()
  })
})

describe('LOAD_WALLET', () => {
  it('is defined', () => {
    expect(LOAD_WALLET).toBeDefined()
  })
})
