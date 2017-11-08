import Immutable from 'immutable'
import { handleActions } from 'redux-actions'
import SortedArray from 'sorted-array'

import { LOAD_ALERTS, LOG, SEEN_ALERTS } from './actions'
import { ALERT } from './levels'


const wrapEventsAsSortedArray = events => SortedArray(events, (a, b) => a.ts < b.ts)


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

        return state.set('events', events.array)
      },
      [SEEN_ALERTS]: state => {
        const events = state.get('events')

        // do in reverse order, for efficiency sake let's stop as soon as we
        // find the boundary of the last time we ran this logic
        for (let i = events.length - 1; 0 <= i; i -= 1) {
          if (events[i].type === ALERT) {
            if (events[i].seen) {
              break
            } else {
              events[i].seen = true
            }
          }
        }

        return state.set('events', events.concat([]))
      }
    },
    InitialState
  )
}
