import { updateBalances, sendTransaction, transactionSending, transactionSent, transactionSendError } from './actionCreators'
import { BALANCES, SEND_TX, TX_SENT, TX_SENDING, TX_SEND_ERROR } from './actions'

describe('updateBalances()', () => {
  it('returns action', () => {
    expect(updateBalances()).toEqual({
      type: BALANCES
    })
  })
})

describe('sendTransaction()', () => {
  it('returns action', () => {
    expect(sendTransaction(123)).toEqual({
      type: SEND_TX,
      payload: 123
    })
  })
})

describe('transactionSending()', () => {
  it('returns action', () => {
    expect(transactionSending(123)).toEqual({
      type: TX_SENDING,
      payload: 123
    })
  })
})

describe('transactionSent(123)', () => {
  it('returns action', () => {
    expect(transactionSent(123)).toEqual({
      type: TX_SENT,
      payload: 123
    })
  })
})

describe('transactionSendError()', () => {
  it('returns action', () => {
    expect(transactionSendError(123)).toEqual({
      type: TX_SEND_ERROR,
      payload: 123
    })
  })
})
