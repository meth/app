import _ from 'lodash'
import BN from 'bn.js'
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { View, Text } from 'react-native'
import { fromWei } from 'web3-utils'

import Button from '../Button'
import Loading from '../Loading'
import AlertsButton from './AlertsButton'
import styles from './styles'

export default class Header extends PureComponent {
  static propTypes = {
    network: PropTypes.object,
    addresses: PropTypes.object,
    unseenAlertsCount: PropTypes.number,
    onPressNetworkInfo: PropTypes.func.isRequired,
    onPressAlerts: PropTypes.func.isRequired,
    style: PropTypes.any
  }

  render () {
    const { addresses, network, style } = this.props

    return (
      <View style={[ styles.container, style ]}>
        <View style={styles.right}>
          {network && addresses ? this.renderBalance(addresses) : null}
          {network ? this.renderNetwork(network) : null}
          {this.renderAlerts()}
        </View>
      </View>
    )
  }

  renderBalance (addresses) {
    const totalWei = Object.values(addresses).reduce(
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

    const syncing = !!_.get(network, 'node.syncing')
    const syncIcon = syncing ? (
      <Loading />
    ) : null

    return (
      <View style={styles.network}>
        <Button
          onPress={onPressNetworkInfo}
          style={styles.networkButton}
          type='header'>
            <Text style={styles.networkButtonText}>{'Private'}</Text>
            {syncIcon}
        </Button>
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
}
