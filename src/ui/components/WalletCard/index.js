import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { View, Text } from 'react-native'

import styles from './styles'
import Icon from '../Icon'

export default class WalletCard extends PureComponent {
  static propTypes = {
    account: PropTypes.shape({
      address: PropTypes.string.isRequired,
      balance: PropTypes.object,
      label: PropTypes.string
    }).isRequired,
    style: PropTypes.any
  }

  render () {
    const { account: { address, balance, label }, style } = this.props

    return (
      <View style={[ styles.container, style ]}>
        <Text style={styles.addressText}>{address}</Text>
        <Text style={styles.addressLabelText}>{label}</Text>
        <Text style={styles.balanceText}>{balance.toString(10)}</Text>
      </View>
    )
  }
}
