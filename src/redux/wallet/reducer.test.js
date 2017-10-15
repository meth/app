import Immutable from 'immutable'

import reducer from './reducer'
import { BALANCES, TX_SENDING, TX_SENT, TX_SEND_ERROR, CANCEL_TX } from './actions'

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

describe('TX_SENDING', () => {
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
    state = state.set('currentTransaction', null)

    const newState = reduce(state, {
      type: TX_SENDING,
      payload: {
        tx: 'whatever'
      }
    })

    expect(newState.get('currentTransaction')).toEqual('whatever')
  })

  it('sets the current transaction promise', () => {
    state = state.set('currentTransactionPromise', null)

    const newState = reduce(state, {
      type: TX_SENDING,
      payload: {
        promise: 'whatever'
      }
    })

    expect(newState.get('currentTransactionPromise')).toEqual('whatever')
  })
})

describe('TX_SEND_ERROR', () => {
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
    state = state.set('currentTransaction', 'whatever')

    const newState = reduce(state, {
      type: TX_SEND_ERROR,
      payload: 'whatever'
    })

    expect(newState.get('currentTransaction')).toEqual(null)
  })

  it('sets the current transaction promise', () => {
    state = state.set('currentTransactionPromise', 'whatever')

    const newState = reduce(state, {
      type: TX_SEND_ERROR,
      payload: 'whatever'
    })

    expect(newState.get('currentTransactionPromise')).toEqual(null)
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

  it('sets the current transaction', () => {
    state = state.set('currentTransaction', 'whatever')

    const newState = reduce(state, {
      type: CANCEL_TX,
      payload: 'whatever'
    })

    expect(newState.get('currentTransaction')).toEqual(null)
  })

  it('sets the current transaction promise', () => {
    state = state.set('currentTransactionPromise', 'whatever')

    const newState = reduce(state, {
      type: CANCEL_TX,
      payload: 'whatever'
    })

    expect(newState.get('currentTransactionPromise')).toEqual(null)
  })
})

describe('TX_SENT', () => {
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
    state = state.set('currentTransaction', 'whatever')

    const newState = reduce(state, {
      type: TX_SENT,
      payload: 'whatever'
    })

    expect(newState.get('currentTransaction')).toEqual(null)
  })

  it('sets the current transaction promise', () => {
    state = state.set('currentTransactionPromise', 'whatever')

    const newState = reduce(state, {
      type: TX_SENT,
      payload: 'whatever'
    })

    expect(newState.get('currentTransactionPromise')).toEqual(null)
  })
})
