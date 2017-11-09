import { createActionCreator } from '../utils'

import { LOAD_ALERTS, LOG, SEEN_ALERTS } from './actions'
import { INFO, WARN, ERROR, ALERT } from '../../constants/logLevels'

export const loadAlerts = createActionCreator(LOAD_ALERTS)
export const seenAlerts = createActionCreator(SEEN_ALERTS)

export const infoEvent = createActionCreator(LOG, (msg, cat) => ({ level: INFO, msg, cat }))
export const warnEvent = createActionCreator(LOG, (msg, cat) => ({ level: WARN, msg, cat }))
export const errorEvent = createActionCreator(LOG, (msg, cat) => ({ level: ERROR, msg, cat }))
export const alertEvent = createActionCreator(LOG, (msg, cat) => ({ level: ALERT, msg, cat }))
