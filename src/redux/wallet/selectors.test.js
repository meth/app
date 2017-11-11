import Immutable from 'immutable'
import { getAccountBalances } from './selectors'

describe('.getAccountBalances()', () => {
  it('returns balances', () => {
    const state = {
      wallet: new Immutable.Map({
        accounts: {
          a: {
            name: 'jeff',
            balance: 1
          },
          b: {
            name: 'ram',
            balance: 2
          }
        }
      })
    }

    expect(getAccountBalances(state)).toEqual({
      a: 1,
      b: 2
    })
  })
})
