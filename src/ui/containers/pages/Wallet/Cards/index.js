import React from 'react'
import { View } from 'react-native'
import PropTypes from 'prop-types'

import { CachePureComponent } from '../../../../helpers/components'
import { connectStore } from '../../../../helpers/redux'
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
          renderCard={this._renderAccountCard}
          renderAddAccountButton={this._renderAddAccountButton}
          onSelectCard={this._onPressSelectCard}
        />
      </View>
    )
  }

  _renderCard = (key, index, renderCardContent, extraProps = {}) => {
    const { activeCard } = this.props

    const isActive = index === activeCard

    return (
      <Button
        type='walletCard'
        key={key}
        style={isActive
          ? styles.cardButton_active
          : styles.cardButton_inactive
        }
        {...(isActive ? {
          stateOverride: { hovering: true }
        } : null)}
        onPress={this.bind(this._onPressSelectCard, index, key)}
        {...extraProps}
      >
        {renderCardContent(isActive)}
      </Button>
    )
  }

  _renderAccountCard = (accounts, address, index) => (
    this._renderCard(address, index, isActive => (
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
    ))
  )

  _renderAddAccountButton = () => {
    const { accounts } = this.props

    const index = Object.keys(accounts).length

    return this._renderCard('add', index, () => (
      <View style={styles.addAccountButton}>
        <Icon name='plus' style={styles.addAccountButtonIcon} />
      </View>
    ), {
      onPress: this._onPressAddAccount
    })
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

  _onPressAddAccount = () => {
    const { showAddAccountModal } = this.props.actions

    showAddAccountModal()
  }

  _onPressSelectCard = index => {
    const { onSelectCard } = this.props

    onSelectCard(index)
  }
}
