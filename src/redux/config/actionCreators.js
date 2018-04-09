import { createActionCreator } from '../utils'

import { LOAD_CONFIG, OPEN_EXTERNAL_URL } from './actions'

export const loadConfig = createActionCreator(LOAD_CONFIG)

export const openExternalUrl =
  createActionCreator(OPEN_EXTERNAL_URL, url => ({ url }))
