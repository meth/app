import _ from 'lodash'
import BN from 'bn.js'
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { View, Text } from 'react-native'
import { fromWei } from 'web3-utils'

import { t } from '../../../../common/strings'
import Button from '../Button'
import Loading from '../Loading'
import AlertsButton from './AlertsButton'
import IconButton from '../IconButton'
import styles from './styles'
import { toDecimalPlaces } from '../../../utils/number'

export default class Header extends PureComponent {
  static propTypes = {
    navState: PropTypes.object.isRequired,
    routes: PropTypes.object.isRequired,
    network: PropTypes.object,
    addresses: PropTypes.object,
    unseenAlertsCount: PropTypes.number,
    onPressNetworkInfo: PropTypes.func.isRequired,
    onPressAlerts: PropTypes.func.isRequired,
    onPressWallet: PropTypes.func.isRequired,
    onPressAddressBook: PropTypes.func.isRequired,
    onPressBrowser: PropTypes.func.isRequired,
    style: PropTypes.any
  }

  render () {
    const { addresses, network, style, navState, routes } = this.props
    const { onPressAddressBook, onPressBrowser } = this.props

    const ALL_INITIALIZED = network && addresses

    return (
      <View style={[ styles.container, style ]}>
        <View style={styles.left}>
          {ALL_INITIALIZED ? (
            <React.Fragment>
              {this.renderBalance(addresses)}
              <IconButton
                type='header'
                tooltip={t('button.addressBook')}
                icon={{ name: 'address-book', style: styles.buttonIcon }}
                style={styles.button}
                onPress={onPressAddressBook}
                stateOverride={this._getButtonStateOverride(navState, routes.AddressBook)}
              />
              <IconButton
                type='header'
                tooltip={t('button.dappBrowser')}
                icon={{ name: 'globe', style: styles.buttonIcon }}
                style={styles.button}
                onPress={onPressBrowser}
                stateOverride={this._getButtonStateOverride(navState, routes.Browser)}
              />
            </React.Fragment>
          ) : null}
        </View>
        <View style={styles.right}>
          {network ? this.renderNetwork(network) : null}
          {this.renderAlerts()}
        </View>
      </View>
    )
  }

  renderBalance (addresses) {
    const { navState, routes, onPressWallet } = this.props

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
        onPress={onPressWallet}
      />
    )
  }

  renderNetwork (network) {
    const { onPressNetworkInfo } = this.props

    const syncing = !!_.get(network, 'node.syncing')
    const syncIcon = syncing ? (
      <Loading />
    ) : null

    return (
      <Button
        onPress={onPressNetworkInfo}
        style={styles.networkButton}
        type='header'>
          <Text style={styles.networkButtonText}>{network.description}</Text>
          {syncIcon}
      </Button>
    )
  }

  renderAlerts () {
    const { unseenAlertsCount, onPressAlerts } = this.props

    return (
      <View style={styles.alert}>
        <AlertsButton
          style={styles.button}
          unseenAlertsCount={unseenAlertsCount}
          onPress={onPressAlerts}
        />
      </View>
    )
  }

  _getButtonStateOverride (navState, route) {
    return (navState.routeName === route.routeName) ? { hovering: true } : null
  }
}
