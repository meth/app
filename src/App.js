import React from 'react'
import { Provider } from 'react-redux'

import { create as createStore } from './redux/store'
import controller from './redux/controller'
import Root from './ui/Root'

const store = createStore()
controller.setStore(store)

export default () => (
  <Provider store={store}>
    <Root />
  </Provider>
)

// initialize the app!
controller.bootstrap.init()
