import _ from 'lodash'
import React from 'react'

import { CachePureComponent } from '../../../helpers/components'
import { connectStore } from '../../../helpers/redux'
import { t } from '../../../../../common/strings'
import styles from './styles'
import Layout from '../Layout'
import TokenTable from './TokenTable'
import TitleText from '../../../components/TitleText'
import ScrollView from '../../../components/ScrollView'
import WalletCard from '../../../components/WalletCard'
import Loading from '../../../components/Loading'
import Button from '../../../components/Button'


@connectStore('account', 'modals', 'config')
export default class Wallet extends CachePureComponent {
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
        <TitleText text={t('title.wallet')} />
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
        onPress={this.bind(this._onSelectCard, index)}
      >
        <WalletCard
          isActive={isActive}
          style={styles.card}
          account={{
            address,
            ...accounts[address]
          }}
          onPressSend={this.bind(this._onSend, address)}
          onPressQrCode={this.bind(this._onQrCode, address)}
          onPressEditLabel={this.bind(this._onEditLabel, address)}
        />
      </Button>
    )
  }

  _onSend = address => {
    const { sendTransaction } = this.props.actions

    sendTransaction({ from: address }).catch(() => {})
  }

  _onQrCode = address => {
    const { showAddressQrModal } = this.props.actions

    showAddressQrModal(address)
  }

  _onEditLabel = address => {
    const { showEditAddressModal } = this.props.actions

    showEditAddressModal(address)
  }

  _onSelectCard = activeCard => this.setState({ activeCard })

  _getSelectedAccount () {
    const { getAccounts } = this.props.selectors
    const { activeCard } = this.state

    const accounts = getAccounts()

    const address = Object.keys(accounts)[activeCard]
    const { balance, tokens, label } = accounts[address]

    return {
      address,
      balance,
      tokens,
      label
    }
  }
}
