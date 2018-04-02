import React from 'react'
import { Provider } from 'react-redux'

import setupFonts from './fonts'
import { setupStore } from './redux'
import * as config from './config'
import nodeConnector from './nodeConnector'
import storage from './storage'
import scheduler from './scheduler'
import * as walletManager from './wallet/manager'
import Root from './ui/Root'
import { router } from './ui/nav'
import { setStore as logSetStore } from './logger'
import { setStore as reduxConnectorSetStore } from './ui/helpers/redux'

// setup fonts
setupFonts()

// setup store and other functions
const store = setupStore({ config, storage, nodeConnector, walletManager, router })
reduxConnectorSetStore(store)
logSetStore(store)
storage.init({ store })
nodeConnector.init({ store, walletManager })
walletManager.init({ store, nodeConnector })

// load config
store.actions.loadConfig()

// schedule the loading of alerts
scheduler.addJob('check_alerts', 300, () => store.actions.loadAlerts())

// root UI
export default () => (
  <Provider store={store}>
    <Root />
  </Provider>
)
