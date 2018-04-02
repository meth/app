import React, { PureComponent } from 'react'
import { View } from 'react-native'

import { connectStore } from '../../../helpers/redux'
import Header from '../../../components/Header'
import ScrollView from '../../../components/ScrollView'
import { routes } from '../../../nav'
import styles from './styles'

@connectStore('account', 'node', 'log', 'modals', 'nav')
export default class Layout extends PureComponent {
  render () {
    const {
      getNodeConnection,
      getNodeState,
      getAccounts,
      getUnseenAlertsCount,
      getCurrentNavState
    } = this.props.selectors

    const { network } = getNodeConnection()
    if (network) {
      network.node = getNodeState()
    }
    const addresses = getAccounts()
    const unseenAlertsCount = getUnseenAlertsCount()
    const navState = getCurrentNavState()

    const { children, contentStyle } = this.props

    return (
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.container}>
        <Header
          style={styles.header}
          navState={navState}
          routes={routes}
          network={network && Object.keys(network).length ? network : null}
          addresses={addresses}
          unseenAlertsCount={unseenAlertsCount}
          onPressNetworkInfo={this.showConnectionInfo}
          onPressAlerts={this.showLog}
          onPressWallet={this.showWallet}
          onPressAddressBook={this.showAddressBook}
          onPressBrowser={this.showBrowser}
        />
        <View style={[ styles.content, contentStyle ]}>
          {children}
        </View>
      </ScrollView>
    )
  }

  showConnectionInfo = () => {
    this.props.actions.showConnectionModal()
  }

  showLog = () => {
    this.props.actions.showLog()
  }

  showWallet = () => {
    const { actions: { navPush } } = this.props

    navPush(routes.Wallet.path)
  }

  showAddressBook = () => {
    const { actions: { navPush } } = this.props

    navPush(routes.AddressBook.path)
  }

  showBrowser = () => {
    const { actions: { navPush } } = this.props

    navPush(routes.Browser.path)
  }
}
