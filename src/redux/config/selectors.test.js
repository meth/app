import Immutable from 'immutable'
import { getNodes } from './selectors'

describe('.getNodes()', () => {
  it('returns nodes', () => {
    const state = {
      config: new Immutable.Map({
        nodes: 123
      })
    }

    expect(getNodes(state)).toEqual(123)
  })
})
