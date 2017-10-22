import Immutable from 'immutable'

import reducer from './reducer'
import { SEND_TX, CANCEL_TX } from './actions'

describe('SEND_TX', () => {
  let event
  let state
  let reduce

  beforeEach(() => {
    event = {
      update: jest.fn(() => event),
      getState: () => null
    }

    state = Immutable.Map({})

    reduce = reducer()
  })

  it('sets the current transaction', () => {
    state = state.set('currentTx', null)

    const newState = reduce(state, {
      type: SEND_TX,
      payload: {
        tx: 'whatever'
      }
    })

    expect(newState.get('currentTx')).toEqual('whatever')
  })

  it('sets the current transaction promise', () => {
    state = state.set('currentTxDeferred', null)

    const newState = reduce(state, {
      type: SEND_TX,
      payload: {
        promise: 'whatever'
      }
    })

    expect(newState.get('currentTxDeferred')).toEqual('whatever')
  })
})

describe('CANCEL_TX', () => {
  let event
  let state
  let reduce

  beforeEach(() => {
    event = {
      update: jest.fn(() => event),
      getState: () => null
    }

    state = Immutable.Map({})

    reduce = reducer()
  })

  it('clears the current transaction', () => {
    state = state.set('currentTx', 'whatever')

    const newState = reduce(state, {
      type: CANCEL_TX,
      payload: 'whatever'
    })

    expect(newState.get('currentTx')).toEqual(null)
  })

  it('clears the current transaction promise', () => {
    state = state.set('currentTxDeferred', 'whatever')

    const newState = reduce(state, {
      type: CANCEL_TX,
      payload: 'whatever'
    })

    expect(newState.get('currentTxDeferred')).toEqual(null)
  })
})
