import React, { PureComponent } from 'react'
import { View } from 'react-native'

import { connectStore } from '../../../helpers/redux'
import Header from '../../../components/Header'
import ScrollView from '../../../components/ScrollView'
import { getAccounts } from '../../../../redux/account/selectors'
import { getNodeConnection, getNodeState } from '../../../../redux/node/selectors'
import { getUnseenAlertsCount } from '../../../../redux/log/selectors'
import { getCurrentNavState } from '../../../../redux/nav/selectors'
import { routes } from '../../../nav'
import styles from './styles'

@connectStore('account', 'node', 'log', 'modals', 'nav')
export default class Layout extends PureComponent {
  render () {
    const { network } = getNodeConnection(this.props)
    if (network) {
      network.node = getNodeState(this.props)
    }
    const addresses = getAccounts(this.props)
    const unseenAlertsCount = getUnseenAlertsCount(this.props)
    const navState = getCurrentNavState(this.props)

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
