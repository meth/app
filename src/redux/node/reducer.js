import { handleActions } from 'redux-actions'
import Immutable from 'immutable'

import { NODE_DISCONNECTED, NODE_IS_CONNECTING } from './actions'
import { success, createStateActionMachine } from '../../utils/stateMachines'

export default () => {
  const InitialState = Immutable.Map({
    [NODE_IS_CONNECTING]: createStateActionMachine(),
    isConnected: false,
    disconnectionReason: undefined,
    genesisBlock: null
  })

  return handleActions(
    {
      [NODE_DISCONNECTED]: (state, { payload: { reason } }) =>
        state.set('isConnected', false).set('disconnectionReason', reason),
      [NODE_IS_CONNECTING]: (state, { payload }) => {
        const machine = state.get(NODE_IS_CONNECTING).update({ payload })

        const connected = machine.getState() === success

        return state
          .set(NODE_IS_CONNECTING, machine)
          .set('isConnected', !!connected)
          .update('genesisBlock', v => (connected ? machine.getData() : v))
      }
    },
    InitialState
  )
}
