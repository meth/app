import _ from 'lodash'
import BN from 'bn.js'
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { View, Text } from 'react-native'
import { fromWei } from 'web3-utils'

import { connectStore } from '../../../helpers/redux'
import { t } from '../../../../../common/strings'
import Button from '../../../components/Button'
import Loading from '../../../components/Loading'
import AlertsButton from './AlertsButton'
import IconButton from '../../../components/IconButton'
import { routes } from '../../../nav'
import styles from './styles'
import { toDecimalPlaces } from '../../../../utils/number'

@connectStore('account', 'node', 'log', 'modals', 'nav')
export default class Header extends PureComponent {
  static propTypes = {
    style: PropTypes.any
  }

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

    const { style } = this.props

    const ALL_INITIALIZED = network && addresses

    return (
      <View style={[ styles.container, style ]}>
        <View style={styles.left}>
          {ALL_INITIALIZED ? (
            <React.Fragment>
              {this.renderBalance(navState, addresses)}
              {/*
                <IconButton
                  type='header'
                  tooltip={t('button.dappBrowser')}
                  icon={{ name: 'globe', style: styles.buttonIcon }}
                  style={styles.button}
                  onPress={this.showBrowser}
                  stateOverride={this._getButtonStateOverride(navState, routes.Browser)}
                />
              */}
              <IconButton
                type='header'
                tooltip={t('button.contracts')}
                icon={{ name: 'code', style: styles.buttonIcon }}
                style={styles.button}
                onPress={this.showContracts}
                stateOverride={this._getButtonStateOverride(navState, routes.Contracts)}
              />
              <IconButton
                type='header'
                tooltip={t('button.transactionHistory')}
                icon={{ name: 'md-swap', style: styles.buttonIcon }}
                style={styles.button}
                onPress={this.showTransactions}
                stateOverride={this._getButtonStateOverride(navState, routes.Transactions)}
              />
              <IconButton
                type='header'
                tooltip={t('button.addressBook')}
                icon={{ name: 'address-book-o', style: styles.buttonIcon }}
                style={styles.button}
                onPress={this.showAddressBook}
                stateOverride={this._getButtonStateOverride(navState, routes.AddressBook)}
              />
            </React.Fragment>
          ) : null}
        </View>
        <View style={styles.right}>
          {network ? this.renderNetwork(network) : null}
          {this.renderAlerts(unseenAlertsCount)}
        </View>
      </View>
    )
  }

  renderBalance (navState, addresses) {
    const totalWei = Object.values(addresses).reduce(
      (m, { balance }) => m.add(balance), new BN(0, 2)
    )

    const totalEther = fromWei(totalWei, 'ether')

    return (
      <Button
        tooltip={t('button.wallet')}
        style={styles.button}
        type='header'
        title={`Ξ ${toDecimalPlaces(totalEther, 1)}`}
        stateOverride={this._getButtonStateOverride(navState, routes.Wallet)}
        onPress={this.showWallet}
      />
    )
  }

  renderNetwork (network) {
    const syncing = !!_.get(network, 'node.syncing')
    const syncIcon = syncing ? (
      <Loading style={styles.networkButtonLoadingSpinner} />
    ) : null

    return (
      <Button
        onPress={this.showConnectionInfo}
        style={styles.networkButton}
        type='header'>
          <Text style={styles.networkButtonText}>{network.description}</Text>
          {syncIcon}
      </Button>
    )
  }

  renderAlerts (unseenAlertsCount) {
    return (
      <View style={styles.alert}>
        <AlertsButton
          style={styles.button}
          unseenAlertsCount={unseenAlertsCount}
          onPress={this.showLog}
        />
      </View>
    )
  }

  _getButtonStateOverride (navState, route) {
    return (navState.routeName === route.routeName) ? {
      buttonState: 'active'
    } : null
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

  showContracts = () => {
    const { actions: { navPush } } = this.props

    navPush(routes.Contracts.path)
  }
}
