import { createAction } from 'redux-actions'

import { NODE_CONNECTED, NODE_CONNECT_ERROR, NODE_CONNECTING, CONNECT_NODE, NODE_DISCONNECTED } from './actions'

export const connectNode = createAction(CONNECT_NODE)

export const nodeConnectError = createAction(NODE_CONNECT_ERROR)

export const nodeConnected = createAction(NODE_CONNECTED)

export const nodeConnecting = createAction(NODE_CONNECTING)

export const nodeDisconnected = createAction(NODE_DISCONNECTED, reason => ({
  reason
}))
