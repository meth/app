import Immutable from 'immutable'
import { handleActions } from 'redux-actions'

import { toInt } from '../../utils/number'

import { SEND_RAW_TX } from '../account/actions'
import {
  LOAD_CONFIG
} from './actions'

export default () => {
  const InitialState = Immutable.Map({
    nodes: undefined,
    networks: undefined,
    tokens: undefined,
    lastGasPrice: 1
  })

  return handleActions(
    {
      [SEND_RAW_TX]: (state, { payload: { gasPrice } }) => (
        state.set('lastGasPrice', toInt(gasPrice))
      ),
      [LOAD_CONFIG]: (state, { payload: { nodes, networks, tokens } }) => {
        const finalNodes = {}

        // for each node let's decorate with more info for convenience sake
        Object.keys(nodes).forEach(category => {
          finalNodes[category] = {
            connections: nodes[category].connections.map(c => ({
              ...c,
              id: JSON.stringify({ category, ...c }),
              category
            }))
          }
        })

        return state
          .set('nodes', finalNodes)
          .set('networks', networks)
          .set('tokens', tokens)
      }
    },
    InitialState
  )
}
