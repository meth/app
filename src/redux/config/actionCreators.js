import { createActionCreator } from '../utils'

import {
  LOAD_CONFIG,
  OPEN_EXTERNAL_URL,
  FETCH_SAFE_GAS_PRICE
} from './actions'

export const loadConfig = createActionCreator(LOAD_CONFIG)

export const openExternalUrl =
  createActionCreator(OPEN_EXTERNAL_URL, url => ({ url }))

export const fetchSafeGasPrice = createActionCreator(FETCH_SAFE_GAS_PRICE)
