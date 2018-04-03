import Immutable from 'immutable'
import { handleActions } from 'redux-actions'

import { LOAD_CONFIG } from './actions'

export default () => {
  const InitialState = Immutable.Map({
    nodes: undefined,
    networks: undefined,
    tokens: undefined
  })

  return handleActions(
    {
      [LOAD_CONFIG]: (state, { payload: { nodes, networks, tokens } }) =>
        state
          .set('nodes', nodes)
          .set('networks', networks)
          .set('tokens', tokens)
    },
    InitialState
  )
}
