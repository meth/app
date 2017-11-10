import Immutable from 'immutable'
import { handleActions } from 'redux-actions'
import binarySearchInsert from 'binary-search-insert'
import isAfter from 'date-fns/is_after'

import { LOAD_ALERTS, LOG, SEEN_ALERTS } from './actions'
import { ALERT } from '../../constants/logLevels'


const comparator = (a, b) => (isAfter(a.ts, b.ts) ? 1 : -1)


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
      [LOAD_ALERTS]: (state, { payload: alerts }) => {
        const events = state.get('events')

        ;(alerts || []).forEach(
          alert => binarySearchInsert(events, comparator, alert)
        )

        return state.set('events', [].concat(events))
      },
      [SEEN_ALERTS]: state =>
        state.set('events', state.get('events').map(e => {
          if (e.level === ALERT) {
            e.seen = true
          }

          return e
        }))
    },
    InitialState
  )
}
