import { createSelector } from 'reselect'

import { LEVELS } from '../../../common/constants/log'

const { ALERT } = LEVELS

const getRawLog = state => state.log.get('events')

export const getAlerts = createSelector(
  getRawLog,
  events => events.filter(e => e.level === ALERT)
)

export const getUnseenAlertsCount = createSelector(
  getAlerts,
  alerts => alerts.filter(a => !a.seen).length
)
