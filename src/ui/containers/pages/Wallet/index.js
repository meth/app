import _ from 'lodash'
import React from 'react'
import { Text } from 'react-native'

import { CachePureComponent } from '../../../helpers/components'
import { connectStore } from '../../../helpers/redux'
import { t } from '../../../../../common/strings'
import styles from './styles'
import Layout from '../Layout'
import TitleText from '../../../components/TitleText'
import ScrollView from '../../../components/ScrollView'
import WalletCard from '../../../components/WalletCard'
import WalletTabBar from '../../../components/WalletTabBar'
import Button from '../../../components/Button'
import ProgressButton from '../../../components/ProgressButton'
import Icon from '../../../components/Icon'
import Table from '../../../components/Table'

const TAB_TOKENS = 'tokens'
const TAB_TRANSACTIONS = 'transactions'

const RENDER_NULL = () => null
const TOKEN_COLUMNS = [ { id: 'address' } ]

@connectStore('account', 'modals', 'config')
export default class Wallet extends CachePureComponent {
  state = {
    activeCard: 0,
    activeTab: TAB_TOKENS,
    checkingBalance: {}
  }

  componentDidUpdate (oldProps, oldState) {
    // if active card changed then reload data
    if (oldState.activeCard !== this.state.activeCard) {
      this._reloadAccountData()
    }
  }

  componentDidMount () {
    this._reloadAccountData()
  }

  render () {
    const { getAccounts } = this.props.selectors
    const { activeTab } = this.state

    const accounts = getAccounts()

    const accountAddresses = Object.keys(accounts)

    return (
      <Layout contentStyle={styles.layoutContent}>
        <TitleText text={t('title.wallet')} />
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
        <WalletTabBar
          style={styles.tabBar}
          tabs={[
            {
              name: TAB_TOKENS,
              label: t('wallet.tab.tokens')
            },
            {
              name: TAB_TRANSACTIONS,
              label: t('wallet.tab.transactions')
            }
          ]}
          selectedTab={activeTab}
          onSelectTab={this._onSelectTab}
        />
        {this._renderActiveTab()}
      </Layout>
    )
  }

  _renderActiveTab () {
    const { getTokenList } = this.props.selectors

    const { activeTab } = this.state

    const tokens = getTokenList()

    switch (activeTab) {
      case TAB_TOKENS: {
        const rows = Object.keys(tokens).map(token => {
          const { name } = (tokens[token] || {})

          return ({
            symbol: {
              value: token
            },
            _filterKey: `${token} ${name || ''}`
          })
        })

        return (
          <Table
            style={styles.tokenTable}
            listStyle={styles.tokenTableList}
            rowStyle={styles.tokenTableRow}
            filterInputStyle={styles.tokenTableFilter}
            filterPlaceholderText={t('wallet.tokens.filterPlaceholder')}
            showFilter={true}
            renderHeader={RENDER_NULL}
            renderRowData={this._renderTokenRowData}
            columns={TOKEN_COLUMNS}
            rows={rows}
          />
        )
      }
      case TAB_TRANSACTIONS: {
        return null
      }
      default:
        return null
    }
  }

  _renderTokenRowData = row => {
    const symbol = _.get(row, 'symbol.value')

    const { checkingBalance } = this.state

    return (
      <React.Fragment>
        <Text style={styles.tokenSymbolText}>{symbol}</Text>
        <ProgressButton
          tooltip={t('wallet.tokens.checkBalance')}
          style={styles.tokenCheckButton}
          onPress={this.bind(this._onCheckTokenBalance, symbol)}
          showInProgress={checkingBalance[symbol]}
        >
          <Icon name='refresh' />
        </ProgressButton>
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
        />
      </Button>
    )
  }

  _onCheckTokenBalance = symbol => {
    const { fetchTokenBalance } = this.props.actions

    this.setState({
      checkingBalance: {
        ...this.state.checkingBalance,
        [symbol]: true
      },
      tokenError: {
        ...this.state.tokenError,
        [symbol]: false
      }
    }, () => {
      fetchTokenBalance(symbol)
        .then(() => {
          this.setState({
            checkingBalance: {
              ...this.state.checkingBalance,
              [symbol]: false
            }
          })
        })
        .catch(() => {
          this.setState({
            checkingBalance: {
              ...this.state.checkingBalance,
              [symbol]: false
            },
            tokenError: {
              ...this.state.tokenError,
              [symbol]: t('error.unexpected')
            }
          })
        })
    })
  }

  _onSelectTab = activeTab => this.setState({ activeTab })

  _onSend = address => {
    const { sendTransaction } = this.props.actions

    sendTransaction({ from: address }).catch(() => {})
  }

  _onQrCode = address => {
    const { showAddressQrModal } = this.props.actions

    showAddressQrModal(address)
  }

  _onSelectCard = activeCard => this.setState({ activeCard })

  _reloadAccountData () {

  }
}
