import Immutable from 'immutable'
import { handleActions } from 'redux-actions'
import SortedArray from 'sorted-array'
import isAfter from 'date-fns/is_after'

import { LOAD_ALERTS, LOG, SEEN_ALERTS } from './actions'
import { ALERT } from '../../constants/logLevels'


const wrapEventsAsSortedArray = events =>
  new SortedArray(events, (a, b) => (isAfter(a.ts, b.ts) ? 1 : -1))


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
        const events = wrapEventsAsSortedArray(state.get('events'))

        ;(alerts || []).forEach(alert => events.insert(alert))

        return state.set('events', [].concat(events.array))
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
