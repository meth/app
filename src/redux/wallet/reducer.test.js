import Immutable from 'immutable'

import reducer from './reducer'
import { ACCOUNT_BALANCES } from './actions'

describe('ACCOUNT_BALANCES', () => {
  it('updates the balances', () => {
    const state = Immutable.Map({})

    const reduce = reducer()

    const newState = reduce(state, {
      type: ACCOUNT_BALANCES,
      payload: {
        dummy: false
      }
    })

    expect(newState.get('accounts')).toEqual({
      dummy: false
    })
  })
})
