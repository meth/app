import log from './log/reducer'
import api from './api/reducer'
import config from './config/reducer'
import nav from './nav/reducer'
import modals from './modals/reducer'
import node from './node/reducer'
import account from './account/reducer'

const reducers = { log, api, config, nav, modals, node, account }

export const createReducers = app =>
  Object.keys(reducers).reduce(
    (m, key) => ({
      ...m,
      [key]: reducers[key](app)
    }),
    {}
  )
