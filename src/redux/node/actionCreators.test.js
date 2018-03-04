import {
  connectNode,
  disconnectNode,
  nodeDisconnected,
  nodeConnecting,
  nodeConnected,
  nodeConnectError,
  notifyNewBlock
} from './actionCreators'

import {
  DISCONNECT_NODE,
  NODE_CONNECTED,
  NODE_CONNECT_ERROR,
  NODE_CONNECTING,
  CONNECT_NODE,
  NODE_DISCONNECTED,
  NEW_BLOCK
} from './actions'

describe('notifyNewBlock()', () => {
  it('returns action', () => {
    expect(notifyNewBlock(123)).toEqual({
      type: NEW_BLOCK,
      payload: {
        reason: 123
      }
    })
  })
})

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

describe('disconnectNode()', () => {
  it('returns action', () => {
    expect(disconnectNode(123)).toEqual({
      type: DISCONNECT_NODE,
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
