import BN from 'bn.js'
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { View, Text } from 'react-native'
import { fromWei } from 'web3-utils'

import Button from '../Button'
import AlertsButton from './AlertsButton'
import IconButton from '../IconButton'
import styles from './styles'

export default class Header extends PureComponent {
  static propTypes = {
    network: PropTypes.object,
    accounts: PropTypes.object,
    unseenAlertsCount: PropTypes.number,
    onPressNetworkInfo: PropTypes.func.isRequired,
    onPressAlerts: PropTypes.func.isRequired,
    style: PropTypes.any
  }

  render () {
    const { accounts, network, appName, style } = this.props

    return (
      <View style={[ styles.container, style ]}>
        <View style={styles.left}>
          <Text style={styles.appNameText}>{appName}</Text>
        </View>
        <View style={styles.right}>
          {network && accounts ? this.renderBalance(accounts) : null}
          {network ? this.renderNetwork(network) : null}
          {this.renderAlerts()}
          {network ? this.renderLogoutButton() : null}
        </View>
      </View>
    )
  }

  renderBalance (accounts) {
    const totalWei = Object.values(accounts).reduce(
      (m, { balance }) => m.add(balance), new BN(0, 2)
    )
    const totalEther = fromWei(totalWei, 'ether')

    return (
      <View style={styles.balance}>
        <Button
          style={styles.button}
          type='header'
          title={`Ξ ${totalEther}`} />
      </View>
    )
  }

  renderNetwork (network) {
    const { onPressNetworkInfo } = this.props

    return (
      <View style={styles.network}>
        <Button
          onPress={onPressNetworkInfo}
          style={styles.button}
          type='header'
          title={network.description} />
      </View>
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

  renderLogoutButton () {
    return (
      <View style={styles.logout}>
        <IconButton
          style={styles.button}
          type='header'
          icon={{ name: 'sign-out' }} />
      </View>
    )
  }
}
