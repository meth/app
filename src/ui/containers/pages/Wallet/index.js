import _ from 'lodash'
import React from 'react'

import { CachePureComponent } from '../../../helpers/components'
import { connectStore } from '../../../helpers/redux'
import { t } from '../../../../../common/strings'
import styles from './styles'
import Layout from '../Layout'
import TokenTable from './TokenTable'
import PageTitleText from '../../../components/PageTitleText'
import ScrollView from '../../../components/ScrollView'
import WalletCard from '../../../components/WalletCard'
import Loading from '../../../components/Loading'
import Button from '../../../components/Button'
import Icon from '../../../components/Icon'


@connectStore('account', 'modals', 'config')
export default class Wallet extends CachePureComponent {
  static navigationOptions = {
    gesturesEnabled: false,
    drawerLabel: t('title.wallet'),
    title: t('title.wallet')
  }

  state = {
    activeCard: 0,
    checkingBalance: {},
    showAllTokens: true
  }

  render () {
    const { getAccounts } = this.props.selectors

    const accounts = getAccounts()

    const accountAddresses = Object.keys(accounts)

    return (
      <Layout contentStyle={styles.layoutContent}>
        <PageTitleText text={t('title.wallet')} />
        {accountAddresses.length ? (
          this._renderContent({ accounts, accountAddresses })
        ) : (
          <Loading style={styles.topLevelLoading} />
        )}
      </Layout>
    )
  }

  _renderContent ({ accounts, accountAddresses }) {
    const { showAllTokens } = this.state
    const { getTokenList } = this.props.selectors

    const selectedAccount = this._getSelectedAccount()

    const tokens = getTokenList()

    const tokenSymbols = Object.keys(tokens)

    const rows = []

    tokenSymbols.forEach(token => {
      const { name, decimals } = (tokens[token] || {})
      const balance = _.get(selectedAccount.tokens, token)

      if (showAllTokens || balance) {
        rows.push({
          symbol: { value: token },
          meta: { name, balance, decimals },
          _filterKey: `${token} ${name || ''}`
        })
      }
    })

    return (
      <React.Fragment>
        <ScrollView
          style={styles.cardsScrollView}
          contentContainerStyle={styles.cardsContent}
          horizontal={true}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        >
          {accountAddresses.map((address, index) => (
            this._renderCard(accounts, address, index)
          ))}
          {this._renderAddAccountButton()}
        </ScrollView>
        <TokenTable style={styles.tokenTable} account={selectedAccount} />
      </React.Fragment>
    )
  }

  _renderCard (accounts, address, index) {
    const { activeCard } = this.state

    const isActive = index === activeCard

    return (
      <Button
        type='walletCard'
        key={address}
        style={isActive ? styles.walletCardButton_active : styles.walletCardButton_inactive}
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

  _renderAddAccountButton () {
    return (
      <Button
        type='walletCard'
        key='add'
        style={[ styles.walletCardButton_inactive, styles.addAccountButton ]}
        onPress={this._onPressAddAccount}
        tooltip={t('button.addAccount')}
        childShouldInheritTextStyle={true}
      >
        <Icon name='plus' style={styles.addAccountButtonIcon} />
      </Button>
    )
  }

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

  _onPressSelectCard = activeCard => this.setState({ activeCard })

  _getSelectedAccount () {
    const { getAccounts } = this.props.selectors
    const { activeCard } = this.state

    const accounts = getAccounts()

    const address = Object.keys(accounts)[activeCard]
    const { balance, tokens, label } = (accounts[address] || {})

    return {
      address,
      balance,
      tokens,
      label
    }
  }
}
