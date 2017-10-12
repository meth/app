import { handleActions } from 'redux-actions'

import { PUSH, RESET } from './actions'

export default ({ router }) => {
  const InitialState = router.getStateForAction(
    router.getActionForPathAndParams('')
  )

  return handleActions(
    {
      [RESET]: (state, { payload: { path, params } }) =>
        router.getStateForAction(
          router.getActionForPathAndParams(path, params)
        ),
      [PUSH]: (state, { payload: { path, params } }) =>
        router.getStateForAction(
          router.getActionForPathAndParams(path, params),
          state
        )
    },
    InitialState
  )
}
