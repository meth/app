import Immutable from 'immutable'

import reducer from './reducer'
import { SHOW, HIDE } from './actions'

describe('SHOW', () => {
  it('shows a modal', () => {
    const reduce = reducer()

    const state = Immutable.Map({
      modal1: false,
      modal2: false
    })

    const newState = reduce(state, {
      type: SHOW,
      payload: 'modal1'
    })

    expect(newState.get('modal1')).toEqual(true)
    expect(newState.get('modal2')).toEqual(false)
  })
})

describe('HIDE', () => {
  it('hides a modal', () => {
    const reduce = reducer()

    const state = Immutable.Map({
      modal1: true,
      modal2: true
    })

    const newState = reduce(state, {
      type: HIDE,
      payload: 'modal1'
    })

    expect(newState.get('modal1')).toEqual(false)
    expect(newState.get('modal2')).toEqual(true)
  })
})
