import { updateBalances } from './actionCreators'
import { BALANCES } from './actions'

describe('updateBalances()', () => {
  it('returns action', () => {
    expect(updateBalances()).toEqual({
      type: BALANCES
    })
  })
})
