import { createSelector } from 'reselect'

import { LEVELS } from '../../../common/constants/log'

const { ALERT } = LEVELS

const getRawLog = state => state.log.get('events')

export const getUnseenAlerts = createSelector(
  getRawLog,
  events => events.filter(e => e.level === ALERT && !e.seen)
)

export const getLogWithoutUnseenAlerts = createSelector(
  getRawLog,
  events => events.filter(e => e.level !== ALERT || e.seen)
)

export const getUnseenAlertsCount = createSelector(
  getUnseenAlerts,
  alerts => alerts.length
)
