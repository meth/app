import Immutable from 'immutable'
import { handleActions } from 'redux-actions'

import { LOG, SEEN_LOG } from './actions'


export default () => {
  const InitialState = Immutable.Map({
    events: []
  })

  return handleActions(
    {
      [LOG]: (state, { payload }) =>
        state.set('events', state.get('events').concat([ {
          ...payload, ts: Date.now()
        } ])),
      [SEEN_LOG]: state =>
        state.set('events', state.get('events').map(e => {
          e.seen = true
          return e
        }).concat([]))
    },
    InitialState
  )
}
