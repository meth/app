import { applyMiddleware, compose, combineReducers, createStore } from 'redux'
import createSagaMiddleware from 'redux-saga'

import { createReducers } from './reducers'
import { createMiddleware } from './middleware'
import { createSagas } from './sagas'

export const createReduxStore = app => {
  const sagaMiddleware = createSagaMiddleware()
  const appMiddleware = createMiddleware(app)
  const reducers = createReducers(app)
  const sagas = createSagas(app)

  const store = compose(
    applyMiddleware(...appMiddleware, sagaMiddleware),
    window && window.devToolsExtension ? window.devToolsExtension() : f => f
  )(createStore)(combineReducers(reducers))

  // hot module reload
  if (__DEV__) {
    if (module.hot) {
      module.hot.accept('./reducers', () =>
        // eslint-disable-next-line global-require
        store.replaceReducer(require('./reducers').createReducers(app)))
    }
  }

  // kick-off sagas
  sagaMiddleware.run(sagas)

  return store
}
