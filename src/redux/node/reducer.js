import { handleActions } from 'redux-actions'
import Immutable from 'immutable'

import {
  NODE_DISCONNECTED,
  NODE_CONNECTED,
  NODE_CONNECTING,
  NODE_CONNECT_ERROR,
  NEW_BLOCK,
  SYNCING,
  INJECT_LAST_CONNECTED_NODE
} from './actions'

export default () => {
  const InitialState = Immutable.Map({
    isConnected: false,
    disconnectionReason: null,
    connection: {},
    latestBlock: null,
    syncing: false,
    lastConnectedNode: null
  })

  return handleActions(
    {
      [INJECT_LAST_CONNECTED_NODE]: (state, { payload: node }) => (
        state
          .set('lastConnectedNode', node)
      ),
      [NODE_DISCONNECTED]: (state, { payload: { reason } }) => (
        state
          .set('isConnected', false)
          .set('connection', {})
          .set('disconnectionReason', reason)
          .set('latestBlock', null)
      ),
      [NODE_CONNECTING]: state => (
        state
          .set('connection', {})
          .set('disconnectionReason', null)
          .set('isConnected', false)
      ),
      [NODE_CONNECT_ERROR]: state => (
        state
          .set('connection', {})
          .set('isConnected', false)
      ),
      [NODE_CONNECTED]: (state, { payload: { node, network } }) => (
        state
          .set('connection', { node, network })
          .set('lastConnectedNode', node)
          .set('isConnected', true)
          .set('latestBlock', null)
      ),
      [NEW_BLOCK]: (state, { payload: block }) => (
        state
          .set('latestBlock', block)
      ),
      [SYNCING]: (state, { payload: syncing }) => (
        state
          .set('syncing', syncing)
      )
    },
    InitialState
  )
}
