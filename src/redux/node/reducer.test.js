import Immutable from 'immutable'

import reducer from './reducer'
import { NODE_CONNECTED, NODE_CONNECTING, NODE_CONNECT_ERROR, NODE_DISCONNECTED } from './actions'
import { ready, inProgress, error, success } from '../../utils/stateMachines'

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

  it('updates the connect event', () => {
    const newState = reduce(state, {
      type: NODE_DISCONNECTED,
      payload: {
        reason: 'Hillary lost'
      }
    })

    expect(event.update).toHaveBeenCalledWith({
      state: ready
    })
    expect(newState.get('connectEvent')).toEqual(event)
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

  it('updates the connect event', () => {
    const newState = reduce(state, {
      type: NODE_CONNECTING,
      payload: 'whatever'
    })

    expect(event.update).toHaveBeenCalledWith({
      state: inProgress,
      data: 'whatever'
    })
    expect(newState.get('connectEvent')).toEqual(event)
  })

  it('normally disables the isConnected flag', () => {
    state = state.set('isConnected', true)

    const newState = reduce(state, {
      type: NODE_CONNECTING,
      payload: 'whatever'
    })

    expect(newState.get('isConnected')).toEqual(false)
  })

  it('normally clears the genesis block', () => {
    state = state.set('networkInfo', 123)

    const newState = reduce(state, {
      type: NODE_CONNECTING,
      payload: 'whatever'
    })

    expect(newState.get('networkInfo')).toEqual({})
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

  it('updates the connect event', () => {
    const newState = reduce(state, {
      type: NODE_CONNECT_ERROR,
      payload: 'whatever'
    })

    expect(event.update).toHaveBeenCalledWith({
      state: error,
      data: 'whatever'
    })
    expect(newState.get('connectEvent')).toEqual(event)
  })

  it('normally disables the isConnected flag', () => {
    state = state.set('isConnected', true)

    const newState = reduce(state, {
      type: NODE_CONNECT_ERROR,
      payload: 'whatever'
    })

    expect(newState.get('isConnected')).toEqual(false)
  })

  it('normally clears the genesis block', () => {
    state = state.set('networkInfo', 123)

    const newState = reduce(state, {
      type: NODE_CONNECT_ERROR,
      payload: 'whatever'
    })

    expect(newState.get('networkInfo')).toEqual({})
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

  it('updates the connect event', () => {
    const newState = reduce(state, {
      type: NODE_CONNECTED,
      payload: 'whatever'
    })

    expect(event.update).toHaveBeenCalledWith({
      state: success
    })
    expect(newState.get('connectEvent')).toEqual(event)
  })

  it('normally enables the isConnected flag', () => {
    state = state.set('isConnected', false)

    const newState = reduce(state, {
      type: NODE_CONNECTED,
      payload: 'whatever'
    })

    expect(newState.get('isConnected')).toEqual(true)
  })

  it('normally sets the genesis block', () => {
    state = state.set('networkInfo', {})

    const newState = reduce(state, {
      type: NODE_CONNECTED,
      payload: 123
    })

    expect(newState.get('networkInfo')).toEqual(123)
  })
})
