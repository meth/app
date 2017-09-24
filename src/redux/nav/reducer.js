import { handleActions } from 'redux-actions'

import { PUSH, RESET } from './actions'

export default ({ router }) => {
  const InitialState = router.getStateForAction(
    router.getActionForPathAndParams('')
  )

  return handleActions(
    {
      [RESET]: (state, { pathName, params }) =>
        router.getStateForAction(
          router.getActionForPathAndParams(pathName, params)
        ),
      [PUSH]: (state, { pathName, params }) =>
        router.getStateForAction(
          router.getActionForPathAndParams(pathName, params),
          state
        )
    },
    InitialState
  )
}
