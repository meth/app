import { loadAlerts, seenAlerts, infoEvent, warnEvent, errorEvent, alertEvent } from './actionCreators'
import { LOG, LOAD_ALERTS, SEEN_ALERTS } from './actions'
import { INFO, WARN, ERROR, ALERT } from '../../constants/logLevels'

describe('loadAlerts()', () => {
  it('returns action', () => {
    expect(loadAlerts()).toEqual({
      type: LOAD_ALERTS
    })
  })
})

describe('seenAlerts()', () => {
  it('returns action', () => {
    expect(seenAlerts()).toEqual({
      type: SEEN_ALERTS
    })
  })
})

describe('infoEvent()', () => {
  it('returns action', () => {
    expect(infoEvent('msg', 'cat')).toEqual({
      type: LOG,
      payload: {
        level: INFO,
        msg: 'msg',
        cat: 'cat'
      }
    })
  })
})

describe('warnEvent()', () => {
  it('returns action', () => {
    expect(warnEvent('msg', 'cat')).toEqual({
      type: LOG,
      payload: {
        level: WARN,
        msg: 'msg',
        cat: 'cat'
      }
    })
  })
})

describe('errorEvent()', () => {
  it('returns action', () => {
    expect(errorEvent('msg', 'cat')).toEqual({
      type: LOG,
      payload: {
        level: ERROR,
        msg: 'msg',
        cat: 'cat'
      }
    })
  })
})

describe('alertEvent()', () => {
  it('returns action', () => {
    expect(alertEvent('msg', 'cat')).toEqual({
      type: LOG,
      payload: {
        level: ALERT,
        msg: 'msg',
        cat: 'cat'
      }
    })
  })
})
