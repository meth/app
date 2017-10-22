import { updateBalances, generateRawTransaction, sendRawTransaction } from './actionCreators'
import { BALANCES, SEND_RAW_TX, GENERATE_RAW_TX } from './actions'

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
