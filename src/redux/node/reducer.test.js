import Immutable from 'immutable'

import reducer from './reducer'
import { NODE_CONNECTED, NODE_CONNECTING, NODE_CONNECT_ERROR, NODE_DISCONNECTED } from './actions'
import { CONNECT_NODE_EVENT } from '../../utils/asyncEvents'
import { inProgress, error, success } from '../../utils/stateMachines'

describe('NODE_DISCONNECTED', () => {
  it('updates the connection status', () => {
    const state = Immutable.Map({})

    const reduce = reducer()

    const newState = reduce(state, {
      type: NODE_DISCONNECTED,
      payload: {
        reason: 'Hillary lost'
      }
    })

    expect(newState.get('isConnected')).toEqual(false)
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
      [CONNECT_NODE_EVENT]: event
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
    expect(newState.get(CONNECT_NODE_EVENT)).toEqual(event)
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
    state = state.set('genesisBlock', 123)

    const newState = reduce(state, {
      type: NODE_CONNECTING,
      payload: 'whatever'
    })

    expect(newState.get('genesisBlock')).toEqual(null)
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
      [CONNECT_NODE_EVENT]: event
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
    expect(newState.get(CONNECT_NODE_EVENT)).toEqual(event)
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
    state = state.set('genesisBlock', 123)

    const newState = reduce(state, {
      type: NODE_CONNECT_ERROR,
      payload: 'whatever'
    })

    expect(newState.get('genesisBlock')).toEqual(null)
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
      [CONNECT_NODE_EVENT]: event
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
    expect(newState.get(CONNECT_NODE_EVENT)).toEqual(event)
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
    state = state.set('genesisBlock', null)

    const newState = reduce(state, {
      type: NODE_CONNECTED,
      payload: 123
    })

    expect(newState.get('genesisBlock')).toEqual(123)
  })
})
