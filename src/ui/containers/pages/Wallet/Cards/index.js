import React from 'react'
import { View } from 'react-native'
import PropTypes from 'prop-types'

import { CachePureComponent } from '../../../../helpers/components'
import { connectStore } from '../../../../helpers/redux'
import { t } from '../../../../../../common/strings'
import styles from './styles'
import Container from './Container'
import WalletCard from '../../../../components/WalletCard'
import Button from '../../../../components/Button'
import Icon from '../../../../components/Icon'


@connectStore('account', 'config')
export default class Cards extends CachePureComponent {
  static propTypes = {
    style: PropTypes.any,
    accounts: PropTypes.object.isRequired,
    activeCard: PropTypes.number.isRequired,
    onSelectCard: PropTypes.func.isRequired
  }

  render () {
    const { style, accounts, activeCard } = this.props

    return (
      <View style={[ styles.container ].concat(style)}>
        <Container
          accounts={accounts}
          activeCard={activeCard}
          renderCard={this._renderCard}
          renderAddAccountButton={this._renderAddAccountButton}
          onSelectCard={this._onPressSelectCard}
        />
      </View>
    )
  }

  _renderCard = (accounts, address, index) => {
    const { activeCard } = this.props

    const isActive = index === activeCard

    return (
      <Button
        type='walletCard'
        key={address}
        style={isActive
          ? styles.cardButton_active
          : styles.cardButton_inactive
        }
        {...(isActive ? {
          stateOverride: { hovering: true }
        } : null)}
        onPress={this.bind(this._onPressSelectCard, index)}
      >
        <WalletCard
          isActive={isActive}
          style={styles.card}
          account={{
            address,
            ...accounts[address]
          }}
          onPressSend={this.bind(this._onPressSend, address)}
          onPressQrCode={this.bind(this._onPressQrCode, address)}
          onPressEditLabel={this.bind(this._onPressEditLabel, address)}
        />
      </Button>
    )
  }

  _renderAddAccountButton = () => (
    <Button
      type='walletCard'
      key='add'
      style={[ styles.cardButton_inactive, styles.addAccountButton ]}
      onPress={this._onPressAddAccount}
      tooltip={t('button.addAccount')}
      childShouldInheritTextStyle={true}
    >
      <Icon name='plus' style={styles.addAccountButtonIcon} />
    </Button>
  )

  _onPressAddAccount = () => {
    const { showAddAccountModal } = this.props.actions

    showAddAccountModal()
  }

  _onPressSend = address => {
    const { sendTransaction } = this.props.actions

    sendTransaction({ from: address }).catch(() => {})
  }

  _onPressQrCode = address => {
    const { showAddressQrModal } = this.props.actions

    showAddressQrModal(address)
  }

  _onPressEditLabel = address => {
    const { showEditAddressModal } = this.props.actions

    showEditAddressModal(address)
  }

  _onPressSelectCard = activeCard => {
    const { onSelectCard } = this.props

    onSelectCard(activeCard)
  }
}
