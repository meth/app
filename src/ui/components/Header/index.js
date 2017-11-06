import BN from 'bn.js'
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { View, Text } from 'react-native'
import { fromWei } from 'web3-utils'

import Button from '../Button'
import IconButton from '../IconButton'
import styles from './styles'

export default class Header extends PureComponent {
  static propTypes = {
    networkInfo: PropTypes.object,
    accountBalances: PropTypes.object,
    onPressNetworkInfo: PropTypes.func.isRequired,
    style: PropTypes.any
  }

  render () {
    const { accountBalances, networkInfo, appName, style } = this.props

    return (
      <View style={[ styles.container, style ]}>
        <View style={styles.left}>
          <Text style={styles.appNameText}>{appName}</Text>
        </View>
        <View style={styles.right}>
          {networkInfo && accountBalances ? this.renderBalance(accountBalances) : null}
          {networkInfo ? this.renderNetwork(networkInfo) : null}
          {this.renderAlerts()}
          {networkInfo ? this.renderLogoutButton() : null}
        </View>
      </View>
    )
  }

  renderBalance (accountBalances) {
    const totalWei = Object.values(accountBalances).reduce((m, v) => m.add(v), new BN(0, 2))
    const totalEther = fromWei(totalWei, 'ether')

    return (
      <View style={styles.balance}>
        <Button
          style={styles.button}
          type='header'
          title={`${totalEther} ETH`} />
      </View>
    )
  }

  renderNetwork (networkInfo) {
    const { onPressNetworkInfo } = this.props

    return (
      <View style={styles.network}>
        <Button
          onPress={onPressNetworkInfo}
          style={styles.button}
          type='header'
          title={networkInfo.description} />
      </View>
    )
  }

  renderAlerts () {
    return (
      <View style={styles.alert}>
        <IconButton
          style={styles.button}
          type='header'
          icon={{ name: 'bell-o' }} />
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
