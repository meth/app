import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { View } from 'react-native'

import styles from './styles'
import LabelledAddress from '../LabelledAddress'
import EtherBalance from '../EtherBalance'


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
          displayShortened={true}
          label={label}
          style={styles.addressLabel}
          addressTextStyle={styles.addressText}
          labelTextStyle={styles.labelText}
        />
        <EtherBalance
          balance={balance}
          style={styles.balance}
          amountTextStyle={styles.amountText}
          unitTextStyle={styles.unitText}
        />
      </View>
    )
  }
}
