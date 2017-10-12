import Immutable from 'immutable'

import reducer from './reducer'
import { INIT } from './actions'

describe('INIT', () => {
  it('updates the nodes and networks', () => {
    const state = Immutable.Map({})

    const reduce = reducer()

    const newState = reduce(state, {
      type: INIT,
      payload: {
        networks: 1,
        nodes: 2
      }
    })

    expect(newState.get('networks')).toEqual(1)
    expect(newState.get('nodes')).toEqual(2)
  })
})
