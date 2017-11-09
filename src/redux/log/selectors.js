import { createSelector } from 'reselect'

import { ALERT } from './levels'

export const getLog = state => state.events.get('events')

export const getUnseenAlerts = createSelector(
  getLog,
  events => events.filter(e => e.level === ALERT && !e.seen)
)

export const getUnseenAlertsCount = createSelector(
  getUnseenAlerts,
  alerts => alerts.length
)
