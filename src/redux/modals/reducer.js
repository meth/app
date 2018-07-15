import Immutable from 'immutable'
import { handleActions } from 'redux-actions'

import { CLOSE_WALLET } from '../account/actions'
import { SHOW, HIDE } from './actions'
import MODALS from '../../../common/constants/modals'

export default () => {
  const InitialState = Immutable.Map(
    Object.keys(MODALS).reduce(
      (m, k) => ({
        ...m,
        [MODALS[k]]: false
      }),
      {}
    )
  )

  return handleActions(
    {
      [SHOW]: (state, { payload: { type, data = {} } }) => state.set(type, data),
      [HIDE]: (state, { payload: { type } }) => state.set(type, false),
      /* when user logs out, close all pending modals */
      [CLOSE_WALLET]: () => InitialState
    },
    InitialState
  )
}
