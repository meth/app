import { createSelector } from 'reselect'

import { ALERT } from './levels'

const getLogEvents = state => state.events.get('events')

const getUnseenAlerts = createSelector(
  getLogEvents,
  events => events.filter(e => e.level === ALERT && !e.seen)
)

export const getUnseenAlertsCount = createSelector(
  getUnseenAlerts,
  alerts => alerts.length
)
