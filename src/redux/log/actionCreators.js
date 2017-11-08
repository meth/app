import { createActionCreator } from '../utils'

import { LOAD_ALERTS, LOG, SEEN_ALERTS } from './actions'
import { WARN, ERROR, ALERT } from './levels'

export const loadAlerts = createActionCreator(LOAD_ALERTS)
export const seenAlerts = createActionCreator(SEEN_ALERTS)

export const warnEvent = createActionCreator(LOG, (msg, cat) => ({ level: WARN, msg, cat }))
export const errorEvent = createActionCreator(LOG, (msg, cat) => ({ level: ERROR, msg, cat }))
export const alertEvent = createActionCreator(LOG, (msg, cat) => ({ level: ALERT, msg, cat }))
