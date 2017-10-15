import { updateBalances, sendTransaction, cancelTransaction, transactionSending, transactionSent, transactionSendError } from './actionCreators'
import { BALANCES, SEND_TX, CANCEL_TX, TX_SENT, TX_SENDING, TX_SEND_ERROR } from './actions'

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

describe('cancelTransaction()', () => {
  it('returns action', () => {
    expect(cancelTransaction(123)).toEqual({
      type: CANCEL_TX,
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

describe('transactionSent()', () => {
  it('returns action', () => {
    expect(transactionSent(123)).toEqual({
      type: TX_SENT,
      payload: 123
    })
  })
})

describe('transactionSendError()', () => {
  it('returns action', () => {
    const err = new Error('test')

    expect(transactionSendError(err)).toEqual({
      type: TX_SEND_ERROR,
      payload: err,
      error: true
    })
  })
})
