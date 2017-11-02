import { updateBalances, generateRawTransaction, sendRawTransaction, loadWallet } from './actionCreators'
import { BALANCES, SEND_RAW_TX, GENERATE_RAW_TX, LOAD_WALLET } from './actions'

describe('loadWallet()', () => {
  it('returns action', () => {
    expect(loadWallet(123)).toEqual({
      type: LOAD_WALLET,
      payload: 123
    })
  })
})

describe('updateBalances()', () => {
  it('returns action', () => {
    expect(updateBalances()).toEqual({
      type: BALANCES
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
