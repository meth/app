import { handleActions } from 'redux-actions'
import Immutable from 'immutable'

import { NODE_DISCONNECTED, NODE_CONNECTED, NODE_CONNECTING, NODE_CONNECT_ERROR } from './actions'

export default () => {
  const InitialState = Immutable.Map({
    isConnected: false,
    disconnectionReason: undefined,
    networkInfo: {}
  })

  return handleActions(
    {
      [NODE_DISCONNECTED]: (state, { payload: { reason } }) => (
        state
          .set('isConnected', false)
          .set('networkInfo', {})
          .set('disconnectionReason', reason)
      ),
      [NODE_CONNECTING]: state => (
        state
          .set('networkInfo', {})
          .set('isConnected', false)
      ),
      [NODE_CONNECT_ERROR]: state => (
        state
          .set('networkInfo', {})
          .set('isConnected', false)
      ),
      [NODE_CONNECTED]: (state, { payload: networkInfo }) => (
        state
          .set('networkInfo', networkInfo)
          .set('isConnected', true)
      )
    },
    InitialState
  )
}
