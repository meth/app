import { handleActions } from 'redux-actions'
import Immutable from 'immutable'

import {
  NODE_DISCONNECTED,
  NODE_CONNECTED,
  NODE_CONNECTING,
  NODE_CONNECT_ERROR,
  NEW_BLOCK
} from './actions'

export default () => {
  const InitialState = Immutable.Map({
    isConnected: false,
    disconnectionReason: null,
    connection: {},
    latestBlock: null
  })

  return handleActions(
    {
      [NODE_DISCONNECTED]: (state, { payload: { reason } }) => (
        state
          .set('isConnected', false)
          .set('connection', {})
          .set('disconnectionReason', reason)
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
      [NODE_CONNECTED]: (state, { payload: connection }) => (
        state
          .set('connection', connection)
          .set('isConnected', true)
      ),
      [NEW_BLOCK]: (state, { payload: block }) => (
        state
          .set('latestBlock', block)
      )
    },
    InitialState
  )
}
