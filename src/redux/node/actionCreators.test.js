import { connectNodeStart } from './actionCreators'
import { NODE_IS_CONNECTING } from './actions'
import { ready } from '../../utils/stateMachines'

describe('connectNodeStart()', () => {
  it('returns action', () => {
    expect(connectNodeStart()).toEqual({
      type: NODE_IS_CONNECTING,
      payload: {
        state: ready
      }
    })
  })
})
