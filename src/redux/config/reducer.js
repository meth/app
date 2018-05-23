import Immutable from 'immutable'
import { handleActions } from 'redux-actions'

import {
  LOAD_CONFIG,
  INJECT_USER_APP_SETTINGS,
  SAVE_PIN
} from './actions'

export default () => {
  const InitialState = Immutable.Map({
    appSettings: Immutable.Map({}),
    appSettingsLoaded: false,
    nodes: undefined,
    networks: undefined,
    tokens: undefined,
    lastGasPrice: 1
  })

  return handleActions(
    {
      [INJECT_USER_APP_SETTINGS]: (state, { payload }) => {
        // data is stored in db as a table/list, so conver to object first
        const obj = payload.reduce((ret, { name, value }) => {
          // eslint-disable-next-line no-param-reassign
          ret[name] = value
          return ret
        }, {})

        return state
          .set('appSettings', Immutable.Map(obj))
          .set('appSettingsLoaded', true)
      },
      [SAVE_PIN]: (state, { payload: pin }) => (
        state.set('appSettings', state.get('appSettings').set('pin', pin))
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
