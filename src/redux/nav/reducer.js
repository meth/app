import { handleActions } from 'redux-actions'

import { PUSH, RESET, BACK } from './actions'

const injectParams = (state, params) => {
  if (params) {
    // eslint-disable-next-line no-param-reassign
    state.routes[state.routes.length - 1].params = params
  }

  return state
}


export default ({ router }) => {
  const InitialState = router.getStateForAction(
    router.getActionForPathAndParams('wallet')
  )

  return handleActions(
    {
      [BACK]: (state, action) => router.getStateForAction(action, state),
      [RESET]: (state, { payload: { path, params } }) =>
        injectParams(router.getStateForAction(
          router.getActionForPathAndParams(path)
        ), params),
      [PUSH]: (state, { payload: { path, params } }) =>
        injectParams(router.getStateForAction(
          router.getActionForPathAndParams(path),
          state
        ), params)
    },
    InitialState
  )
}
