import { handleActions } from 'redux-actions'
import Immutable from 'immutable'

import { NODE_DISCONNECTED, NODE_CONNECTED, NODE_CONNECTING, NODE_CONNECT_ERROR } from './actions'
import { CONNECT_NODE_EVENT } from '../../utils/asyncEvents'
import { success, error, inProgress, createStateActionMachine } from '../../utils/stateMachines'

export default () => {
  const InitialState = Immutable.Map({
    [CONNECT_NODE_EVENT]: createStateActionMachine(),
    isConnected: false,
    disconnectionReason: undefined,
    genesisBlock: null
  })

  return handleActions(
    {
      [NODE_DISCONNECTED]: (state, { payload: { reason } }) => (
        state
          .set('isConnected', false)
          .set('disconnectionReason', reason)
      ),
      [NODE_CONNECTING]: (state, { payload: data }) => (
        state
          .set('genesisBlock', null)
          .set('isConnected', false)
          .set(CONNECT_NODE_EVENT, state.get(CONNECT_NODE_EVENT).update({
            state: inProgress,
            data
          }))
      ),
      [NODE_CONNECT_ERROR]: (state, { payload: data }) => (
        state
          .set('genesisBlock', null)
          .set('isConnected', false)
          .set(CONNECT_NODE_EVENT, state.get(CONNECT_NODE_EVENT).update({
            state: error,
            data
          }))
      ),
      [NODE_CONNECTED]: (state, { payload: genesisBlock }) => (
        state
          .set('genesisBlock', genesisBlock)
          .set('isConnected', true)
          .set(CONNECT_NODE_EVENT, state.get(CONNECT_NODE_EVENT).update({
            state: success
          }))
      )
    },
    InitialState
  )
}
