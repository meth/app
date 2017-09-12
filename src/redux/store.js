import { applyMiddleware, compose, combineReducers, createStore } from 'redux'
// import createLogger from 'redux-logger'

import * as reducers from './reducers/index'

export const create = () => {
  const combinedReducer = combineReducers(reducers)

  const middleware = [
    // createLogger(),
  ]

  const store = compose(applyMiddleware(...middleware))(createStore)(
    combinedReducer
  )

  // Livereactload
  if (module.onReload) {
    module.onReload(() => {
      /* eslint-disable global-require */
      store.replaceReducer(combineReducers(require('./reducers/index')))
      // return true to indicate that this module is accepted and
      // there is no need to reload its parent modules
      return true
    })
  }

  return store
}
