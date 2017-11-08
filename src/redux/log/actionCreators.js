import { createActionCreator } from '../utils'

import { LOG_EVENT, SEEN_EVENTS } from './actions'
import { WARN, ERROR, ALERT } from './levels'

export const warnEvent = createActionCreator(LOG_EVENT, (msg, cat) => ({ level: WARN, msg, cat }))
export const errorEvent = createActionCreator(LOG_EVENT, (msg, cat) => ({ level: ERROR, msg, cat }))
export const alertEvent = createActionCreator(LOG_EVENT, (msg, cat) => ({ level: ALERT, msg, cat }))
export const seenEvents = createActionCreator(SEEN_EVENTS)
