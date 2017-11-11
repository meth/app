import Immutable from 'immutable'

import { getUnseenAlerts, getUnseenAlertsCount, getLogWithoutUnseenAlerts } from './selectors'
import { LEVELS } from '../../constants/log'

const { INFO, WARN, ERROR, ALERT } = LEVELS

const events = [
  { level: ALERT, msg: 'msg1' },
  { level: ALERT, msg: 'msg2', seen: true },
  { level: INFO, msg: 'msg3' },
  { level: WARN, msg: 'msg4' },
  { level: ERROR, msg: 'msg5' },
  { level: ALERT, msg: 'msg6' }
]

describe('.getUnseenAlerts()', () => {
  it('returns unseen alerts', () => {
    const state = {
      log: new Immutable.Map({ events })
    }

    expect(getUnseenAlerts(state)).toEqual([
      { level: ALERT, msg: 'msg1' },
      { level: ALERT, msg: 'msg6' }
    ])
  })
})

describe('.getUnseenAlertsCount()', () => {
  it('returns number of unseen alerts', () => {
    const state = {
      log: new Immutable.Map({ events })
    }

    expect(getUnseenAlertsCount(state)).toEqual(2)
  })
})

describe('.getLogWithoutUnseenAlerts()', () => {
  it('returns everything except unseen alerts', () => {
    const state = {
      log: new Immutable.Map({ events })
    }

    expect(getLogWithoutUnseenAlerts(state)).toEqual([
      { level: ALERT, msg: 'msg2', seen: true },
      { level: INFO, msg: 'msg3' },
      { level: WARN, msg: 'msg4' },
      { level: ERROR, msg: 'msg5' }
    ])
  })
})
