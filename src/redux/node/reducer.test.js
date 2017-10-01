import Immutable from 'immutable'

import reducer from './reducer'
import { NODE_IS_CONNECTING, NODE_DISCONNECTED } from './actions'
import { success } from '../../utils/stateMachines'

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

describe('NODE_IS_CONNECTING', () => {
  it('updates the state machine', () => {
    const machine = {
      update: jest.fn(() => machine),
      getState: () => null
    }

    const state = Immutable.Map({
      [NODE_IS_CONNECTING]: machine
    })

    const reduce = reducer()

    const newState = reduce(state, {
      type: NODE_IS_CONNECTING,
      payload: 'whatever'
    })

    expect(machine.update).toHaveBeenCalledWith({ payload: 'whatever' })
    expect(newState.get(NODE_IS_CONNECTING)).toEqual(machine)
  })

  it('normally disables the isConnected flag', () => {
    const machine = {
      update: jest.fn(() => machine),
      getState: () => null
    }

    const state = Immutable.Map({
      [NODE_IS_CONNECTING]: machine,
      isConnected: true
    })

    const reduce = reducer()

    const newState = reduce(state, {
      type: NODE_IS_CONNECTING,
      payload: 'whatever'
    })

    expect(newState.get('isConnected')).toEqual(false)
  })

  it('normally does not update the genesis block', () => {
    const machine = {
      update: jest.fn(() => machine),
      getState: () => null
    }

    const state = Immutable.Map({
      [NODE_IS_CONNECTING]: machine,
      genesisBlock: 123
    })

    const reduce = reducer()

    const newState = reduce(state, {
      type: NODE_IS_CONNECTING,
      payload: 'whatever'
    })

    expect(newState.get('genesisBlock')).toEqual(123)
  })

  describe('must represent a successful connection', () => {
    it('to enable the isConnected flag', () => {
      const machine = {
        update: jest.fn(() => machine),
        getState: () => success,
        getData: () => ({ blockNumber: 1 })
      }

      const state = Immutable.Map({
        [NODE_IS_CONNECTING]: machine,
        isConnected: false
      })

      const reduce = reducer()

      const newState = reduce(state, {
        type: NODE_IS_CONNECTING,
        payload: 'whatever'
      })

      expect(newState.get('isConnected')).toEqual(true)
    })

    it('to update the genesis block', () => {
      const machine = {
        update: jest.fn(() => machine),
        getState: () => success,
        getData: () => ({ blockNumber: 1 })
      }

      const state = Immutable.Map({
        [NODE_IS_CONNECTING]: machine,
        genesisBlock: 123
      })

      const reduce = reducer()

      const newState = reduce(state, {
        type: NODE_IS_CONNECTING,
        payload: 'whatever'
      })

      expect(newState.get('genesisBlock')).toEqual({ blockNumber: 1 })
    })
  })
})
