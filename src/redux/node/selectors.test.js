import Immutable from 'immutable'
import { getNodeIsConnected, getDisconnectReason, getConnectionEvent, getNetworkInfo } from './selectors'

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

describe('.getConnectionEvent()', () => {
  it('returns connection status', () => {
    const state = {
      node: new Immutable.Map({
        connectEvent: 123
      })
    }

    expect(getConnectionEvent(state)).toEqual(123)
  })
})

describe('.getNetworkInfo()', () => {
  it('returns connection status', () => {
    const state = {
      node: new Immutable.Map({
        networkInfo: 123
      })
    }

    expect(getNetworkInfo(state)).toEqual(123)
  })
})

describe('.getDisconnectReason()', () => {
  it('returns disconnection reason', () => {
    const state = {
      node: new Immutable.Map({
        disconnectReason: 123
      })
    }

    expect(getDisconnectReason(state)).toEqual(123)
  })
})
