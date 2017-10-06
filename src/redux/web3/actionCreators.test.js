import { sendRequest } from './actionCreators'
import { REQUEST } from './actions'

describe('sendRequest()', () => {
  it('with payload returns action', () => {
    expect(sendRequest({
      method: 'getAccounts'
    })).toEqual({
      type: REQUEST,
      payload: {
        method: 'getAccounts'
      }
    })
  })
})
