import React from 'react'
import { Provider } from 'react-redux'

import { createReduxStore } from './redux'
import { init } from './redux/config/actionCreators'
import * as config from './config'
import nodeConnector from './nodeConnector'
import * as walletManager from './wallet/manager'
import Root from './ui/Root'
import { router } from './ui/nav'

const store = createReduxStore({ config, nodeConnector, walletManager, router })
nodeConnector.init({ store, walletManager })
walletManager.init({ store, nodeConnector })

export default () => (
  <Provider store={store}>
    <Root />
  </Provider>
)

// go!
store.dispatch(init())
