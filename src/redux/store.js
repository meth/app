import { applyMiddleware, compose, combineReducers, createStore } from 'redux'
// import createLogger from 'redux-logger'

export const create = () => {
  let combinedReducer = combineReducers(require('./reducers/index'))

  const middleware = [
    // createLogger(),
  ]

  let store = compose(applyMiddleware(...middleware))(createStore)(
    combinedReducer
  )

  // Livereactload
  if (module.onReload) {
    module.onReload(() => {
      store.replaceReducer(combineReducers(require('./reducers/index')))
      // return true to indicate that this module is accepted and
      // there is no need to reload its parent modules
      return true
    })
  }

  return store
}
