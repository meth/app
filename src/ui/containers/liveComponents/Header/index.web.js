import _ from 'lodash'
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { View, Text } from 'react-native'

import { connectStore } from '../../../helpers/redux'
import { t } from '../../../../../common/strings'
import Button from '../../../components/Button'
import Loading from '../../../components/Loading'
import AlertsButton from './AlertsButton'
import IconButton from '../../../components/IconButton'
import TitleText from '../../../components/TitleText'
import { routes } from '../../../nav'
import styles from './styles'
import { getTotalAccountsBalanceAsStr } from '../../../../utils/number'

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
      getCurrentRoute,
      isUserAuthenticated
    } = this.props.selectors

    const { network } = getNodeConnection()
    if (network) {
      network.node = getNodeState()
    }

    const userAuthenticated = isUserAuthenticated()

    const addresses = getAccounts()
    const unseenAlertsCount = getUnseenAlertsCount()
    const currentRoute = getCurrentRoute()

    const { style } = this.props

    const ALL_INITIALIZED = network && addresses && userAuthenticated

    return (
      <View style={[ styles.container, style ]}>
        <View style={styles.left}>
          {ALL_INITIALIZED ? (
            <React.Fragment>
              {this.renderBalance(currentRoute, addresses)}
              <IconButton
                type='text'
                tooltip={t('button.dappBrowser')}
                icon={{ name: 'application', style: styles.buttonIcon }}
                style={styles.button}
                onPress={this.showBrowser}
                stateOverride={this._getButtonStateOverride(currentRoute, routes.Browser)}
              />
              <IconButton
                type='text'
                tooltip={t('button.contracts')}
                icon={{ name: 'code', style: styles.buttonIcon }}
                style={styles.button}
                onPress={this.showContracts}
                stateOverride={this._getButtonStateOverride(currentRoute, routes.Contracts)}
              />
              <IconButton
                type='text'
                tooltip={t('button.transactionHistory')}
                icon={{ name: 'clock', style: styles.buttonIcon }}
                style={styles.button}
                onPress={this.showTransactions}
                stateOverride={this._getButtonStateOverride(currentRoute, routes.Transactions)}
              />
              <IconButton
                type='text'
                tooltip={t('button.addressBook')}
                icon={{ name: 'md-contact', style: styles.buttonIcon }}
                style={styles.button}
                onPress={this.showAddressBook}
                stateOverride={this._getButtonStateOverride(currentRoute, routes.AddressBook)}
              />
              <IconButton
                type='text'
                tooltip={t('button.convertUnits')}
                icon={{ name: 'ios-calculator', style: styles.buttonIcon }}
                style={styles.button}
                onPress={this.showUnitConverter}
                stateOverride={this._getButtonStateOverride(currentRoute, routes.UnitConverter)}
              />
            </React.Fragment>
          ) : null}
        </View>
        <View style={styles.middle}>
          {userAuthenticated ? this.renderTitle(currentRoute) : null}
        </View>
        <View style={styles.right}>
          {network ? this.renderNetwork(network) : null}
          {this.renderAlerts(unseenAlertsCount)}
          {userAuthenticated ? this.renderLogout() : null}
        </View>
      </View>
    )
  }

  renderTitle ({ routeName }) {
    const title = _.get(routes[routeName], 'screen.navigationOptions.title', '')

    return (
      <TitleText style={styles.pageTitle} text={title} />
    )
  }

  renderBalance (currentRoute, addresses) {
    return (
      <Button
        tooltip={t('button.wallet')}
        style={styles.button}
        type='text'
        title={getTotalAccountsBalanceAsStr(addresses)}
        stateOverride={this._getButtonStateOverride(currentRoute, routes.Wallet)}
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
        type='text'
        tooltip={t('tooltip.showConnectionInfo')}
        childShouldInheritTextStyle={true}
      >
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

  renderLogout () {
    return (
      <IconButton
        type='text'
        tooltip={t('tooltip.logout')}
        icon={{ name: 'logout', style: styles.buttonIcon }}
        style={styles.button}
        onPress={this.logout}
      />
    )
  }

  _getButtonStateOverride (currentRoute, route) {
    return (currentRoute.routeName === route.routeName) ? {
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
    const { navGo } = this.props.actions

    navGo(routes.Wallet.routeName)
  }

  showAddressBook = () => {
    const { navGo } = this.props.actions

    navGo(routes.AddressBook.routeName)
  }

  showBrowser = () => {
    const { navGo } = this.props.actions

    navGo(routes.Browser.routeName)
  }

  showTransactions = () => {
    const { navGo } = this.props.actions

    navGo(routes.Transactions.routeName)
  }

  showContracts = () => {
    const { navGo } = this.props.actions

    navGo(routes.Contracts.routeName)
  }

  showUnitConverter = () => {
    const { navGo } = this.props.actions

    navGo(routes.UnitConverter.routeName)
  }

  logout = () => {
    const { closeWallet } = this.props.actions

    closeWallet()
  }
}
