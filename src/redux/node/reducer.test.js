import Immutable from 'immutable'

import reducer from './reducer'
import { NODE_CONNECTED, NODE_CONNECTING, NODE_CONNECT_ERROR, NODE_DISCONNECTED } from './actions'

describe('NODE_DISCONNECTED', () => {
  let event
  let state
  let reduce

  beforeEach(() => {
    event = {
      update: jest.fn(() => event),
      getState: () => null
    }

    state = Immutable.Map({
      connectEvent: event
    })

    reduce = reducer()
  })

  it('updates the connection status', () => {
    const newState = reduce(state, {
      type: NODE_DISCONNECTED,
      payload: {
        reason: 'Hillary lost'
      }
    })

    expect(newState.get('isConnected')).toEqual(false)
  })

  it('updates the disconnect reason', () => {
    const newState = reduce(state, {
      type: NODE_DISCONNECTED,
      payload: {
        reason: 'Hillary lost'
      }
    })

    expect(newState.get('disconnectionReason')).toEqual('Hillary lost')
  })
})

describe('NODE_CONNECTING', () => {
  let event
  let state
  let reduce

  beforeEach(() => {
    event = {
      update: jest.fn(() => event),
      getState: () => null
    }

    state = Immutable.Map({
      connectEvent: event
    })

    reduce = reducer()
  })

  it('normally disables the isConnected flag', () => {
    state = state.set('isConnected', true)

    const newState = reduce(state, {
      type: NODE_CONNECTING,
      payload: 'whatever'
    })

    expect(newState.get('isConnected')).toEqual(false)
  })

  it('normally clears the disconnection reason', () => {
    state = state.set('disconnectionReason', 123)

    const newState = reduce(state, {
      type: NODE_CONNECTING,
      payload: 'whatever'
    })

    expect(newState.get('disconnectionReason')).toEqual(null)
  })

  it('normally clears the connection info', () => {
    state = state.set('connection', 123)

    const newState = reduce(state, {
      type: NODE_CONNECTING,
      payload: 'whatever'
    })

    expect(newState.get('connection')).toEqual({})
  })
})

describe('NODE_CONNECT_ERROR', () => {
  let event
  let state
  let reduce

  beforeEach(() => {
    event = {
      update: jest.fn(() => event),
      getState: () => null
    }

    state = Immutable.Map({
      connectEvent: event
    })

    reduce = reducer()
  })

  it('normally disables the isConnected flag', () => {
    state = state.set('isConnected', true)

    const newState = reduce(state, {
      type: NODE_CONNECT_ERROR,
      payload: 'whatever'
    })

    expect(newState.get('isConnected')).toEqual(false)
  })

  it('normally clears the connection info', () => {
    state = state.set('connection', 123)

    const newState = reduce(state, {
      type: NODE_CONNECT_ERROR,
      payload: 'whatever'
    })

    expect(newState.get('connection')).toEqual({})
  })
})

describe('NODE_CONNECTED', () => {
  let event
  let state
  let reduce

  beforeEach(() => {
    event = {
      update: jest.fn(() => event),
      getState: () => null
    }

    state = Immutable.Map({
      connectEvent: event
    })

    reduce = reducer()
  })

  it('normally enables the isConnected flag', () => {
    state = state.set('isConnected', false)

    const newState = reduce(state, {
      type: NODE_CONNECTED,
      payload: 'whatever'
    })

    expect(newState.get('isConnected')).toEqual(true)
  })

  it('normally sets the connection info', () => {
    state = state.set('connection', {})

    const newState = reduce(state, {
      type: NODE_CONNECTED,
      payload: 123
    })

    expect(newState.get('connection')).toEqual(123)
  })
})
