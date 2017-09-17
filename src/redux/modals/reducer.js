import Immutable from 'immutable'
import { handleActions } from 'redux-actions'

import { SHOW, HIDE } from './actions'
import MODALS from '../../utils/modals'

const InitialState = Immutable.Map(
  Object.keys(MODALS).reduce((m, k) => {
    m[MODALS[k]] = undefined
    return m
  }, {})
)

export default handleActions(
  {
    [SHOW]: (state, { payload }) => {
      state = state.set(payload, true)
      return state
    },
    [HIDE]: (state, { payload }) => {
      state = state.set(payload, false)
      return state
    }
  },
  InitialState
)
