import _ from 'lodash'
import React from 'react'

import { CachePureComponent } from '../../../helpers/components'
import { connectStore } from '../../../helpers/redux'
import { t } from '../../../../../common/strings'
import styles from './styles'
import Layout from '../Layout'
import TokenTable from './TokenTable'
import Cards from './Cards'
import AlertBox from '../../../components/AlertBox'
import Loading from '../../../components/Loading'


@connectStore('account', 'config')
export default class Wallet extends CachePureComponent {
  static navigationOptions = {
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

    return (
      <Layout contentStyle={styles.layoutContent}>
        {_.isEmpty(accounts) ? (
          <Loading style={styles.topLevelLoading} />
        ) : (
          this._renderContent(accounts)
        )}
      </Layout>
    )
  }

  _renderContent (accounts) {
    const { activeCard } = this.state

    const selectedAccount = this._getSelectedAccount()

    const numAccounts = Object.keys(accounts).length

    return (
      <React.Fragment>
        <Cards
          style={styles.cards}
          activeCard={activeCard}
          accounts={accounts}
          onSelectCard={this._onPressSelectCard}
        />
        {numAccounts <= activeCard ? (
          <AlertBox
            style={styles.addAccountAlertBox}
            type='info'
            text={t('wallet.pressButtonAboveToAddAccount')}
          />
        ) : (
          this._renderTokenTable(selectedAccount)
        )}
      </React.Fragment>
    )
  }

  _renderTokenTable (selectedAccount) {
    return (
      <TokenTable style={styles.tokenTable} account={selectedAccount} />
    )
  }

  _onPressSelectCard = activeCard => {
    this.setState({
      activeCard,
      shouldDeferTokenTableRendering: true
    })
  }

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
