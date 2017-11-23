import Immutable from 'immutable'

import reducer from './reducer'
import { LOG, LOAD_ALERTS, SEEN_ALERTS } from './actions'
import { MAX_ITEMS, LEVELS } from '../../../common/constants/log'

const { INFO, WARN, ERROR, ALERT } = LEVELS

describe('LOG', () => {
  it('appends to the list of events', () => {
    const state = Immutable.Map({
      events: [ 123 ]
    })

    const reduce = reducer()

    const newState = reduce(state, {
      type: LOG,
      payload: {
        msg: 'msg',
        cat: 'cat'
      }
    })

    const events = newState.get('events')

    expect(events.length).toEqual(2)
    expect(events[1]).toMatchObject({
      msg: 'msg',
      cat: 'cat'
    })
    expect(events[1].ts).toBeTruthy()
  })

  it('trims the list if it becomes too big', () => {
    let state = Immutable.Map({
      events: [ 123 ]
    })

    const reduce = reducer()

    for (let i = 0; MAX_ITEMS > i; i += 1) {
      state = reduce(state, {
        type: LOG,
        payload: {
          msg: 'msg',
          cat: 'cat'
        }
      })
    }

    const events = state.get('events')

    expect(events.length).toEqual(MAX_ITEMS)
    expect(events[0]).toMatchObject({
      msg: 'msg',
      cat: 'cat'
    })
  })
})

describe('LOAD_ALERTS', () => {
  it('adds alerts to event list in chronological order', () => {
    const events = [
      { ts: Date.now() - 110000, msg: 'msg0' },
      { ts: Date.now() - 100000, msg: 'msg1' },
      { ts: Date.now() - 50000, msg: 'msg2' },
      { ts: Date.now() - 20000, msg: 'msg3' },
      { ts: Date.now() - 1, msg: 'msg4' }
    ]

    const state = Immutable.Map({
      events: [ events[1], events[3] ]
    })

    const reduce = reducer()

    const newState = reduce(state, {
      type: LOAD_ALERTS,
      payload: [ events[4], events[2], events[0] ]
    })

    const newEvents = newState.get('events')

    expect(newEvents).toEqual(events)
  })

  it('and can handle string timestamp formats too', () => {
    const anchorDate = new Date(2017, 1, 10)
    const events = [
      { ts: anchorDate.getTime() - 100000, msg: 'msg0' },
      { ts: anchorDate.toString(), msg: 'msg1' },
      { ts: anchorDate.getTime() + 20000, msg: 'msg2' }
    ]

    const state = Immutable.Map({
      events: [ events[0], events[2] ]
    })

    const reduce = reducer()

    const newState = reduce(state, {
      type: LOAD_ALERTS,
      payload: [ events[1] ]
    })

    const newEvents = newState.get('events')

    expect(newEvents).toEqual(events)
  })

  it('and trims the list if necessary', () => {
    const anchorDate = new Date(2017, 1, 10)

    const state = Immutable.Map({
      events: [ 123 ]
    })

    const alerts = []
    for (let i = 0; MAX_ITEMS > i; i += 1) {
      alerts.push({ ts: anchorDate.getTime() - i, msg: 'msg0' })
    }

    const reduce = reducer()

    const newState = reduce(state, {
      type: LOAD_ALERTS,
      payload: alerts
    })

    const newEvents = newState.get('events')

    expect(newEvents.length).toEqual(MAX_ITEMS)
    expect(newEvents[0]).toEqual(alerts[alerts.length - 1])
  })
})

describe('SEEN_ALERTS', () => {
  it('marks all alerts as seen', () => {
    const events = [
      { ts: Date.now() - 110000, msg: 'msg0', level: ALERT },
      { ts: Date.now() - 100000, msg: 'msg1', level: INFO },
      { ts: Date.now() - 50000, msg: 'msg2', level: WARN },
      { ts: Date.now() - 20000, msg: 'msg3', level: ERROR },
      { ts: Date.now() - 1, msg: 'msg4', level: ALERT }
    ]

    const state = Immutable.Map({
      events
    })

    const reduce = reducer()

    const newState = reduce(state, {
      type: SEEN_ALERTS
    })

    const newEvents = newState.get('events')

    expect(newEvents).toEqual([
      { ...events[0], seen: true },
      events[1],
      events[2],
      events[3],
      { ...events[4], seen: true }
    ])
  })
})
