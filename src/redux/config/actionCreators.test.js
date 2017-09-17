import { init } from './actionCreators'
import { INIT } from './actions'

describe('init()', () => {
  it('returns action', () => {
    expect(init()).toEqual({
      type: INIT
    })
  })
})
