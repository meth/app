import React from 'react'
import { YellowBox, SafeAreaView } from 'react-native'
import { Provider } from 'react-redux'

import { setupFonts } from './fonts'
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

if (YellowBox) {
  YellowBox.ignoreWarnings([
    '%cWarning: a promise was created in a handler',
    'Module RCTImageLoader requires main queue setup',
    'Remote debugger is in a background tab',
    'Warning: In next release empty section headers',
    'Meth/db',
    'Warning: isMounted'
  ])
}

// setup fonts
setupFonts()

// setup store and other functions
const store = setupStore({ config, storage, nodeConnector, walletManager, router })
reduxConnectorSetStore(store)
logSetStore(store)
storage.init({ config, store })
nodeConnector.init({ store, walletManager })
walletManager.init({ store, nodeConnector })


// load config
store.actions.loadConfig()

// load app data
storage.loadAppData()

// schedule jobs
// scheduler.addJob('check_alerts', 300, () => store.actions.loadAlerts())
store.actions.loadAlerts()
scheduler.addJob('check_transactions', 20, () => store.actions.checkPendingTransactions())

// root UI
const App = () => (
  <SafeAreaView style={{ flex: 1 }}>
    <Provider store={store}>
      <Root />
    </Provider>
  </SafeAreaView>
)

export default App
