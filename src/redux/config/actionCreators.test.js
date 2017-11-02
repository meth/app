import { loadConfig } from './actionCreators'
import { LOAD_CONFIG } from './actions'

describe('loadConfig()', () => {
  it('returns action', () => {
    expect(loadConfig()).toEqual({
      type: LOAD_CONFIG
    })
  })
})
