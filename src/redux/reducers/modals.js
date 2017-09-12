import Immutable from 'immutable'

import { Actions } from '../actions'
import MODALS from '../../utils/modals'

const InitialState = Immutable.Map(
  Object.keys(MODALS).reduce((m, k) => {
    m[MODALS[k]] = undefined
    return m
  }, {})
)

export default function(state = InitialState, { type, payload }) {
  let newState = state

  switch (type) {
    case Actions.NODE_DISCONNECTED:
      newState = newState.set(MODALS.CONNECT_NODE, true)
      break

    case Actions.SHOW_MODAL:
      newState = newState.set(payload, true)
      break

    case Actions.HIDE_MODAL:
      newState = newState.set(payload, false)
      break

    default:
      break
  }

  return newState
}
