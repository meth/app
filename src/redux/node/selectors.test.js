import Immutable from 'immutable'
import { getNodeIsConnected, getDisconnectReason, getNetworkInfo } from './selectors'

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
