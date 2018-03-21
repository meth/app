import React from 'react'
import { Provider } from 'react-redux'

import setupFonts from './fonts'
import { createReduxStore } from './redux'
import * as config from './config'
import nodeConnector from './nodeConnector'
import storage from './storage'
import scheduler from './scheduler'
import * as walletManager from './wallet/manager'
import Root from './ui/Root'
import { router } from './ui/nav'
import { setStore as logSetStore } from './logger'

// setup fonts
setupFonts()

const store = createReduxStore({ config, storage, nodeConnector, walletManager, router })
logSetStore(store)
storage.init({ store })
nodeConnector.init({ store, walletManager })
walletManager.init({ store, nodeConnector })

export default () => (
  <Provider store={store}>
    <Root />
  </Provider>
)

// load config
store.actions.loadConfig()

// schedule the loading of alerts
scheduler.addJob('check_alerts', 300, () => store.actions.loadAlerts())
