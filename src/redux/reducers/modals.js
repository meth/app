import Immutable from 'immutable'

import { Actions } from '../actions'
import MODALS from '../../utils/modals'


const InitialState = Immutable.Map(Object.keys(MODALS).reduce((m, k) => {
  m[MODALS[k]] = undefined
  return m
}, {}))


export default function (state = InitialState, { type, payload }) {
  switch (type) {
    case Actions.NODE_DISCONNECTED:
      state = state.set(MODALS.CONNECT_NODE, true)
      break

    case Actions.SHOW_MODAL:
      state = state.set(payload, true)
      break
    case Actions.HIDE_MODAL:
      state = state.set(payload, false)
      break
  }

  return state
}
