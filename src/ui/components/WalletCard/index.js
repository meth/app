import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { View } from 'react-native'

import { t } from '../../../../common/strings'
import { createStyles } from './styles'
import LabelledAddress from '../LabelledAddress'
import EtherBalance from '../EtherBalance'
import IconButton from '../IconButton'


export default class WalletCard extends PureComponent {
  static propTypes = {
    isActive: PropTypes.bool,
    account: PropTypes.shape({
      address: PropTypes.string.isRequired,
      balance: PropTypes.object,
      label: PropTypes.string
    }).isRequired,
    style: PropTypes.any,
    onPressSend: PropTypes.func,
    onPressQrCode: PropTypes.func,
    onPressEditLabel: PropTypes.func
  }

  static defaultProps = {
    isActive: true
  }

  render () {
    const {
      account: { address, balance, label },
      style,
      isActive,
      onPressEditLabel
    } = this.props

    const styles = createStyles(isActive ? 'active' : 'inactive')

    return (
      <View style={[ styles.container, style ]} pointerEvents={isActive ? 'auto' : 'none'}>
        <LabelledAddress
          address={address}
          displayShortened={true}
          label={label}
          style={styles.addressLabel}
          addressTextStyle={styles.addressText}
          labelTextStyle={styles.labelText}
          editButtonProps={onPressEditLabel ? {
            disabled: !isActive,
            style: styles.labelEditButton,
            icon: {
              style: styles.labelEditButtonText
            },
            onPress: onPressEditLabel,
            tooltip: t('button.editLabel')
          } : null}
        />
        <EtherBalance
          canToggle={isActive}
          balance={balance}
          style={styles.balance}
          amountTextStyle={styles.amountText}
          unitTextStyle={styles.unitText}
        />
        <View style={styles.transButtons}>
          <IconButton
            type='text'
            disabled={!isActive}
            tooltip={t('button.sendCrypto')}
            style={styles.transButton}
            icon={{ name: 'send' }}
            onPress={this._onPressSend}
          />
          <IconButton
            type='text'
            disabled={!isActive}
            tooltip={t('button.showQrCode')}
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
