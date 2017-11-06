import { handleActions } from 'redux-actions'
import Immutable from 'immutable'

import { NODE_DISCONNECTED, NODE_CONNECTED, NODE_CONNECTING, NODE_CONNECT_ERROR } from './actions'

export default () => {
  const InitialState = Immutable.Map({
    isConnected: false,
    disconnectionReason: null,
    connection: {}
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
      )
    },
    InitialState
  )
}
