import React, { PureComponent } from 'react'
import { View, Text } from 'react-native'

import { t } from '../../../../../common/strings'
import { connectStore } from '../../../helpers/redux'
import Header from '../../../components/Header'
import ScrollView from '../../../components/ScrollView'
import BlockOfText from '../../../components/BlockOfText'
import { routes } from '../../../nav'
import styles from './styles'
import logger from '../../../../logger'

@connectStore('account', 'node', 'log', 'modals', 'nav')
export default class Layout extends PureComponent {
  state = {
    uiError: null
  }

  componentDidCatch (error, info) {
    logger.error('UI error', error, info)

    this.setState({ uiError: { error, info } })
  }

  render () {
    const { uiError } = this.state

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

    if (uiError) {
      return (
        <View style={styles.container}>
          <Text style={styles.uiErrorText}>{t('error.unexpectedPleaseRestart')}</Text>
          <BlockOfText text={uiError.error.stack} />
          <BlockOfText text={uiError.info.componentStack} />
        </View>
      )
    }

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
          onPressTransactions={this.showTransactions}
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

  showTransactions = () => {
    const { actions: { navPush } } = this.props

    navPush(routes.Transactions.path)
  }
}
