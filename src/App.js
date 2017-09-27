import React from 'react'
import { Provider } from 'react-redux'

import { createReduxStore } from './redux'
import NodeConnector from './nodeConnector'
import Root from './ui/Root'

const store = createReduxStore()

NodeConnector.setStore(store)

export default () => (
  <Provider store={store}>
    <Root />
  </Provider>
)
