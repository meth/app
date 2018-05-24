import _ from 'lodash'
import React from 'react'
import { SafeAreaView, View, Text } from 'react-native'

import { t } from '../../../../../common/strings'
import { CachePureComponent } from '../../../helpers/components'
import { connectStore } from '../../../helpers/redux'
import { routes } from '../../../nav'
import ScrollView from '../../../components/ScrollView'
import Loading from '../../../components/Loading'
import Button from '../../../components/Button'
import styles from './styles'
import { getTotalAccountsBalanceAsStr } from '../../../../utils/number'


@connectStore('nav', 'node', 'account', 'log')
export default class MobileDrawer extends CachePureComponent {
  render () {
    const { descriptors } = this.props
    const { getCurrentRoute, getAccounts } = this.props.selectors

    const accounts = getAccounts()
    const { routeName: currentRouteName } = getCurrentRoute()

    const pages = Object.keys(descriptors).map(desc => {
      const {
        options: { drawerLabel },
        state: { routeName }
      } = descriptors[desc]

      const title = routes.Wallet.routeName === routeName
        ? `${drawerLabel}: ${getTotalAccountsBalanceAsStr(accounts)}`
        : drawerLabel

      return (
        <Button
          style={styles.button}
          textStyle={styles.buttonText}
          key={desc}
          type='mobileDrawer'
          title={title}
          onPress={this.bind(this._onPressRoute, routeName)}
          {...(routeName === currentRouteName ? {
            stateOverride: {
              buttonState: 'hover'
            }
          } : null)}
        />
      )
    })

    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
      >
        <SafeAreaView style={styles.container}>
          <View style={styles.topItems}>
            {pages}
          </View>
          <View style={styles.bottomItems}>
            {this._renderNetworkButton()}
            {this._renderLogButton()}
            {this._renderLogoutButton()}
          </View>
        </SafeAreaView>
      </ScrollView>
    )
  }

  _renderLogButton () {
    const { getUnseenAlertsCount } = this.props.selectors

    return (
      <Button
        style={styles.button}
        textStyle={styles.buttonText}
        type='mobileDrawer'
        title={t('title.mobileMenu.log', { numAlerts: getUnseenAlertsCount })}
        onPress={this._onPressLog}
      />
    )
  }

  _renderLogoutButton () {
    return (
      <Button
        style={styles.button}
        textStyle={styles.buttonText}
        type='mobileDrawer'
        title={t('title.mobileMenu.logout')}
        onPress={this._onPressLogout}
      />
    )
  }

  _renderNetworkButton () {
    const {
      getNodeConnection,
      getNodeState
    } = this.props.selectors

    const { network } = getNodeConnection()
    if (network) {
      network.node = getNodeState()
    }

    const syncing = !!_.get(network, 'node.syncing')
    const syncIcon = syncing ? (
      <Loading style={styles.networkButtonLoadingSpinner} />
    ) : null

    return (
      <Button
        style={styles.button}
        textStyle={styles.buttonText}
        type='mobileDrawer'
        onPress={this._onPressNetwork}
        childShouldInheritTextStyle={true}
      >
        <Text>
          {t('title.mobileMenu.network', { network: _.get(network, 'description') })}
        </Text>
        {syncIcon}
      </Button>
    )
  }

  _onPressLogout = () => {
    const { closeWallet } = this.props.actions

    closeWallet()
  }

  _onPressRoute = routeName => {
    const { navGo } = this.props.actions

    navGo(routeName)
  }

  _onPressNetwork = () => {
    const { showConnectionModal } = this.props.actions

    showConnectionModal()
  }

  _onPressLog = () => {
    const { showLog } = this.props.actions

    showLog()
  }
}
