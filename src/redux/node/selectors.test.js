import Immutable from 'immutable'

import {
  getNodeIsConnected,
  getDisconnectReason,
  getNodeConnection,
  getNodeState
} from './selectors'

describe('.getNodeState()', () => {
  it('returns latest block', () => {
    const state = {
      node: new Immutable.Map({
        latestBlock: 123,
        syncing: 456
      })
    }

    expect(getNodeState(state)).toEqual({
      latestBlock: 123,
      syncing: 456
    })
  })
})

describe('.getNodeIsConnected()', () => {
  it('returns connection status', () => {
    const state = {
      node: new Immutable.Map({
        isConnected: 123
      })
    }

    expect(getNodeIsConnected(state)).toEqual(123)
  })
})

describe('.getNodeConnection()', () => {
  it('returns connection status', () => {
    const state = {
      node: new Immutable.Map({
        connection: 123
      })
    }

    expect(getNodeConnection(state)).toEqual(123)
  })
})

describe('.getDisconnectReason()', () => {
  it('returns disconnection reason', () => {
    const state = {
      node: new Immutable.Map({
        disconnectionReason: 123
      })
    }

    expect(getDisconnectReason(state)).toEqual(123)
  })
})
