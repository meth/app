import React from 'react'
import { Provider } from 'react-redux'

import { create as createStore } from './redux/store'
import dispatcher from './redux/dispatcher'
import Root from './ui/Root'

const store = createStore()
dispatcher.setStore(store)

export default () => (
  <Provider store={store}>
    <Root />
  </Provider>
)

// initialize the app!
dispatcher.init()
