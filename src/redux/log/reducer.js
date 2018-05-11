import Immutable from 'immutable'
import { handleActions } from 'redux-actions'
import binarySearchInsert from 'binary-search-insert'

import { buildSortComparator } from '../../utils/datetime'
import { LOAD_ALERTS, LOG, SEEN_ALERTS } from './actions'
import { MAX_ITEMS, LEVELS } from '../../../common/constants/log'

const { ALERT } = LEVELS


const sortByDateComparator = buildSortComparator('ts')

const trimEvents = events =>
  (events.length > MAX_ITEMS ? events.slice(events.length - MAX_ITEMS) : [].concat(events))


export default () => {
  const InitialState = Immutable.Map({
    events: []
  })

  return handleActions(
    {
      [LOG]: (state, { payload }) =>
        state.set('events', trimEvents(
          state.get('events').concat({ ...payload, ts: Date.now() })
        )),
      [LOAD_ALERTS]: (state, { payload: alerts }) => {
        const events = state.get('events')

        ;(alerts || []).forEach(
          alert => binarySearchInsert(events, sortByDateComparator, alert)
        )

        return state.set('events', trimEvents(events))
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
