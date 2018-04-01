import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { View, Text } from 'react-native'

import styles from './styles'
import LabelledAddress from '../LabelledAddress'

export default class WalletCard extends PureComponent {
  static propTypes = {
    active: PropTypes.bool,
    account: PropTypes.shape({
      address: PropTypes.string.isRequired,
      balance: PropTypes.object,
      label: PropTypes.string
    }).isRequired,
    style: PropTypes.any
  }

  render () {
    const {
      account: { address, balance, label },
      style
    } = this.props

    return (
      <View style={[ styles.container, style ]}>
        <LabelledAddress
          address={address}
          label={label}
          style={styles.addressLabel}
          addressTextStyle={styles.addressText}
          labelTextStyle={styles.labelText}
        />
        <Text style={styles.balanceText}>{balance.toString(10)}</Text>
      </View>
    )
  }
}
