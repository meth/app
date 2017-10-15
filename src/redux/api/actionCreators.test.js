import { web3Request, generateAccount, finalizeTransaction } from './actionCreators'
import { WEB3_REQUEST, GENERATE_ACCOUNT, FINALIZE_TRANSACTION } from './actions'

describe('web3Request()', () => {
  it('with payload returns action', () => {
    expect(web3Request({
      method: 'getAccounts'
    })).toEqual({
      type: WEB3_REQUEST,
      payload: {
        method: 'getAccounts'
      }
    })
  })
})

describe('finalizeTransaction()', () => {
  it('with payload returns action', () => {
    expect(finalizeTransaction(123)).toEqual({
      type: FINALIZE_TRANSACTION,
      payload: 123
    })
  })
})

describe('generateAccount()', () => {
  it('with payload returns action', () => {
    expect(generateAccount(123)).toEqual({
      type: GENERATE_ACCOUNT,
      payload: 123
    })
  })
})
