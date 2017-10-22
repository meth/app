import Immutable from 'immutable'
import { getAccountBalances } from './selectors'

describe('.getAccountBalances()', () => {
  it('returns balances', () => {
    const state = {
      wallet: new Immutable.Map({
        balances: 123
      })
    }

    expect(getAccountBalances(state)).toEqual(123)
  })
})
