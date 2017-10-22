import { createActionCreator } from '../utils'

import { NODE_CONNECTED, NODE_CONNECT_ERROR, NODE_CONNECTING, CONNECT_NODE, NODE_DISCONNECTED } from './actions'

export const connectNode = createActionCreator(CONNECT_NODE)

export const nodeConnectError = createActionCreator(NODE_CONNECT_ERROR)

export const nodeConnected = createActionCreator(NODE_CONNECTED)

export const nodeConnecting = createActionCreator(NODE_CONNECTING)

export const nodeDisconnected = createActionCreator(NODE_DISCONNECTED, reason => ({
  reason
}))
