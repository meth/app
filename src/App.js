import React from 'react'
import { Provider } from 'react-redux'

import { createReduxStore } from './redux'
import * as config from './config'
import nodeConnector from './nodeConnector'
import Root from './ui/Root'
import { router } from './ui/nav'

const store = createReduxStore({ config, nodeConnector, router })

nodeConnector.setStore(store)

export default () => (
  <Provider store={store}>
    <Root />
  </Provider>
)
