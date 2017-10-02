import Immutable from 'immutable'

import reducer from './reducer'
import { BALANCES } from './actions'

describe('BALANCES', () => {
  it('updates the balances', () => {
    const state = Immutable.Map({})

    const reduce = reducer()

    const newState = reduce(state, {
      type: BALANCES,
      payload: {
        dummy: false
      }
    })

    expect(newState.get('balances')).toEqual({
      dummy: false
    })
  })
})
