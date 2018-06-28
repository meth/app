import React from 'react'
import { View } from 'react-native'
import PropTypes from 'prop-types'

import { t } from '../../../../../../common/strings'
import { toast } from '../../../../../env'
import { CachePureComponent } from '../../../../helpers/components'
import { connectStore } from '../../../../helpers/redux'
import { isWeb } from '../../../../../utils/deviceInfo'
import styles from './styles'
import Container from './Container'
import CardButton from './CardButton'
import WalletCard from '../../../../components/WalletCard'
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

  _renderCard = (key, index, renderCardContent, propsOverride = {}) => {
    const { activeCard } = this.props

    const isActive = index === activeCard

    return (
      <CardButton
        key={key}
        isActive={isActive}
        onPress={this.bind(this._onPressSelectCard, index, key)}
        propsOverride={propsOverride}
      >
        {renderCardContent(isActive)}
      </CardButton>
    )
  }

  _renderAccountCard = (accounts, address, index) => (
    this._renderCard(address, index, isActive => (
      <WalletCard
        isActive={isWeb ? isActive : true}
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
      onPress: this._onPressAddAccount,
      type: 'walletCardAddButton'
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
    const { generateAccount } = this.props.actions

    generateAccount()
      .then(() => {
        toast(t('toast.newAccountGenerated'))
      })
      .catch(error => {
        const { showErrorAlert } = this.props.actions

        return showErrorAlert(`${error}`)
      })
  }

  _onPressSelectCard = index => {
    const { onSelectCard } = this.props

    onSelectCard(index)
  }
}
