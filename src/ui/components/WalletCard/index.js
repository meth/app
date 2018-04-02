import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { View } from 'react-native'

import { t } from '../../../../common/strings'
import styles from './styles'
import LabelledAddress from '../LabelledAddress'
import EtherBalance from '../EtherBalance'
import IconButton from '../IconButton'


export default class WalletCard extends PureComponent {
  static propTypes = {
    account: PropTypes.shape({
      address: PropTypes.string.isRequired,
      balance: PropTypes.object,
      label: PropTypes.string
    }).isRequired,
    style: PropTypes.any,
    onPressSend: PropTypes.func,
    onPressQrCode: PropTypes.func
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
        <View style={styles.transButtons}>
          <IconButton
            tooltip={t('button.send')}
            style={styles.transButton}
            icon={{ name: 'arrow-circle-up' }}
            onPress={this._onPressSend}
          />
          <IconButton
            tooltip={t('button.qrCode')}
            icon={{ name: 'qrcode' }}
            style={styles.transButton}
            onPress={this._onPressQrCode}
          />
        </View>
      </View>
    )
  }

  _onPressSend = () => {
    const {
      account: { address },
      onPressSend
    } = this.props

    if (onPressSend) {
      onPressSend(address)
    }
  }

  _onPressQrCode = () => {
    const {
      account: { address },
      onPressQrCode
    } = this.props

    if (onPressQrCode) {
      onPressQrCode(address)
    }
  }
}
