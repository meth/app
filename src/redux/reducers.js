import config from './config/reducer'
import nav from './nav/reducer'
import modals from './modals/reducer'
import node from './node/reducer'
// import wallet from './wallet/reducer'

const reducers = { config, nav, modals, node }

export const createReducers = app =>
  Object.keys(reducers).reduce(
    (m, key) => ({
      ...m,
      [key]: reducers[key](app)
    }),
    {}
  )
