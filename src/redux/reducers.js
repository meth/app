import log from './log/reducer'
import api from './api/reducer'
import config from './config/reducer'
import nav from './nav/reducer'
import modals from './modals/reducer'
import node from './node/reducer'
import wallet from './wallet/reducer'

const reducers = { log, api, config, nav, modals, node, wallet }

export const createReducers = app =>
  Object.keys(reducers).reduce(
    (m, key) => ({
      ...m,
      [key]: reducers[key](app)
    }),
    {}
  )
