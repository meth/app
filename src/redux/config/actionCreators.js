import { createActionCreator } from '../utils'

import {
  LOAD_CONFIG,
  SAVE_PIN,
  OPEN_EXTERNAL_URL,
  FETCH_SAFE_GAS_PRICE,
  INJECT_USER_APP_SETTINGS
} from './actions'

export const injectUserAppSettings = createActionCreator(INJECT_USER_APP_SETTINGS)

export const loadConfig = createActionCreator(LOAD_CONFIG)

export const openExternalUrl =
  createActionCreator(OPEN_EXTERNAL_URL, url => ({ url }))

export const fetchSafeGasPrice = createActionCreator(FETCH_SAFE_GAS_PRICE)

export const savePin = createActionCreator(SAVE_PIN)
