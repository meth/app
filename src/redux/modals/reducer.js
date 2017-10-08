import Immutable from 'immutable'
import { handleActions } from 'redux-actions'

import { SHOW, HIDE } from './actions'
import MODALS from '../../utils/modals'

export default () => {
  const InitialState = Immutable.Map(
    Object.keys(MODALS).reduce(
      (m, k) => ({
        ...m,
        [MODALS[k]]: undefined
      }),
      {}
    )
  )

  return handleActions(
    {
      [SHOW]: (state, { payload }) => state.set(payload, true),
      [HIDE]: (state, { payload }) => state.set(payload, false)
    },
    InitialState
  )
}