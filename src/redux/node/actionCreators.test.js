import {
  connectNode,
  nodeDisconnected,
  nodeConnecting,
  nodeConnected,
  nodeConnectError
} from './actionCreators'
import { NODE_DISCONNECTED, CONNECT_NODE, NODE_CONNECT_ERROR, NODE_CONNECTING, NODE_CONNECTED } from './actions'

describe('nodeDisconnected()', () => {
  it('returns action', () => {
    expect(nodeDisconnected(123)).toEqual({
      type: NODE_DISCONNECTED,
      payload: {
        reason: 123
      }
    })
  })
})

describe('connectNode()', () => {
  it('returns action', () => {
    expect(connectNode(123)).toEqual({
      type: CONNECT_NODE,
      payload: 123
    })
  })
})

describe('nodeConnecting()', () => {
  it('returns action', () => {
    expect(nodeConnecting(123)).toEqual({
      type: NODE_CONNECTING,
      payload: 123
    })
  })
})

describe('nodeConnectError()', () => {
  it('returns action', () => {
    const err = new Error('test')

    expect(nodeConnectError(err)).toEqual({
      type: NODE_CONNECT_ERROR,
      payload: err
    })
  })
})

describe('nodeConnected()', () => {
  it('returns action', () => {
    expect(nodeConnected(123)).toEqual({
      type: NODE_CONNECTED,
      payload: 123
    })
  })
})
