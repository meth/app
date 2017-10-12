import { web3Request, generateAccount } from './actionCreators'
import { WEB3_REQUEST, GENERATE_ACCOUNT } from './actions'

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

describe('generateAccount()', () => {
  it('with payload returns action', () => {
    expect(generateAccount(123)).toEqual({
      type: GENERATE_ACCOUNT,
      payload: 123
    })
  })
})
