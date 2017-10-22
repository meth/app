import Immutable from 'immutable'
import { getModals } from './selectors'

describe('.getModals()', () => {
  it('returns modals', () => {
    const state = {
      modals: new Immutable.Map({
        modal1: 1,
        modal2: 2
      })
    }

    expect(getModals(state)).toEqual({
      modal1: 1,
      modal2: 2
    })
  })
})
