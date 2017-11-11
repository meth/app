import { updateAccountBalances, updateAccountNames, generateMnemonic, generateRawTransaction, sendRawTransaction, loadWallet } from './actionCreators'
import { ACCOUNT_BALANCES, ACCOUNT_NAMES, SEND_RAW_TX, GENERATE_RAW_TX, LOAD_WALLET, GENERATE_MNEMONIC } from './actions'

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

describe('updateAccountBalances()', () => {
  it('returns action', () => {
    expect(updateAccountBalances()).toEqual({
      type: ACCOUNT_BALANCES
    })
  })
})

describe('updateAccountNames()', () => {
  it('returns action', () => {
    expect(updateAccountNames()).toEqual({
      type: ACCOUNT_NAMES
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
