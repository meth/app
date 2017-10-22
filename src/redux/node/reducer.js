import { handleActions } from 'redux-actions'
import Immutable from 'immutable'

import { NODE_DISCONNECTED, NODE_CONNECTED, NODE_CONNECTING, NODE_CONNECT_ERROR } from './actions'
import { ready, success, error, inProgress, createStateActionMachine } from '../../utils/stateMachines'

export default () => {
  const InitialState = Immutable.Map({
    connectEvent: createStateActionMachine(),
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
          .set('connectEvent', state.get('connectEvent').update({
            state: ready
          }))
      ),
      [NODE_CONNECTING]: (state, { payload: data }) => (
        state
          .set('networkInfo', {})
          .set('isConnected', false)
          .set('connectEvent', state.get('connectEvent').update({
            state: inProgress,
            data
          }))
      ),
      [NODE_CONNECT_ERROR]: (state, { payload: data }) => (
        state
          .set('networkInfo', {})
          .set('isConnected', false)
          .set('connectEvent', state.get('connectEvent').update({
            state: error,
            data
          }))
      ),
      [NODE_CONNECTED]: (state, { payload: networkInfo }) => (
        state
          .set('networkInfo', networkInfo)
          .set('isConnected', true)
          .set('connectEvent', state.get('connectEvent').update({
            state: success
          }))
      )
    },
    InitialState
  )
}
