import { createAction } from 'redux-actions'

import { ready, inProgress, error, success } from '../../utils/stateMachines'
import { NODE_IS_CONNECTING, NODE_DISCONNECTED } from './actions'

export const connectNode = createAction(NODE_IS_CONNECTING, data => ({
  state: ready,
  data
}))

export const connectNodeInProgress = createAction(NODE_IS_CONNECTING, data => ({
  state: inProgress,
  data
}))

export const connectNodeError = createAction(NODE_IS_CONNECTING, data => ({
  state: error,
  data
}))

export const connectNodeSuccess = createAction(NODE_IS_CONNECTING, data => ({
  state: success,
  data
}))

export const nodeDisconnected = createAction(NODE_DISCONNECTED, reason => ({
  reason
}))
