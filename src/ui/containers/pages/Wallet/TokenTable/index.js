import _ from 'lodash'
import React from 'react'
import PropTypes from 'prop-types'
import { Text, View } from 'react-native'

import { CachePureComponent } from '../../../../helpers/components'
import { connectStore } from '../../../../helpers/redux'
import { t } from '../../../../../../common/strings'
import styles from './styles'
import TokenBalance from '../../../../components/TokenBalance'
import IconButton from '../../../../components/IconButton'
import ProgressButton from '../../../../components/ProgressButton'
import Icon from '../../../../components/Icon'
import ErrorBox from '../../../../components/ErrorBox'
import Table from '../../../../components/Table'

const RENDER_NULL = () => null
const TOKEN_COLUMNS = [ { id: 'address' } ]

@connectStore('account')
export default class TokenTable extends CachePureComponent {
  static propTypes = {
    account: PropTypes.object.isRequired
  }

  state = {
    checkingBalance: {},
    showAllTokens: true
  }

  render () {
    const { account, style } = this.props
    const { showAllTokens } = this.state
    const { getTokenList } = this.props.selectors

    const tokens = getTokenList()
    const tokenSymbols = Object.keys(tokens)

    const rows = []

    tokenSymbols.forEach(token => {
      const { name, decimals, isCustom } = (tokens[token] || {})
      const balance = _.get(account.tokens, token)

      if (showAllTokens || balance) {
        rows.push({
          symbol: { value: token },
          meta: { name, balance, decimals, isCustom },
          _filterKey: `${token} ${name || ''}`
        })
      }
    })

    return (
      <View style={style}>
        <Table
          style={styles.table}
          listStyle={styles.tableList}
          rowStyle={styles.tokenRow}
          filterInputStyle={styles.tableFilterInput}
          filterPlaceholderText={t('wallet.tokens.filterPlaceholder')}
          renderFilter={this._renderTokenFilter}
          renderHeader={RENDER_NULL}
          renderBody={this._renderTokensTableBody}
          renderRowData={this._renderTokenRowData}
          columns={TOKEN_COLUMNS}
          rows={rows}
        />
      </View>
    )
  }

  _renderTokenFilter = defaultRenderFunc => {
    const { showAllTokens } = this.state

    const renderedFilter = defaultRenderFunc()

    return (
      <View style={styles.tableFilterRow}>
        {renderedFilter}
        <IconButton
          icon={{ name: showAllTokens ? 'ios-funnel-outline' : 'ios-funnel' }}
          style={styles.tableFilterButton}
          tooltip={t(`button.${showAllTokens ? 'onlyShowTokensWithBalance' : 'showAllTokens'}`)}
          onPress={this._onPressToggleShowAllTokens}
        />
        <IconButton
          icon={{ name: 'plus' }}
          style={styles.tableAddButton}
          tooltip={t('button.addCustomToken')}
          onPress={this._onPressAddToken}
        />
      </View>
    )
  }

  _renderTokensTableBody = defaultRenderFunc => {
    const { getTokenList } = this.props.selectors

    const tokens = getTokenList()

    if (!Object.keys(tokens).length) {
      return (
        <Text style={styles.noneText}>
          {t('wallet.tokens.noneConfigured')}
        </Text>
      )
    }

    return defaultRenderFunc()
  }

  _renderTokenRowData = row => {
    const symbol = _.get(row, 'symbol.value')
    const { name, balance, decimals, isCustom } = row.meta

    const { checkingBalance, tokenError } = this.state

    const error = _.get(tokenError, symbol)

    return (
      <React.Fragment>
        <View style={styles.tokenRowLeft}>
          <Text style={styles.tokenSymbolText}>{symbol}</Text>
          <Text style={styles.tokenNameText}>{name}</Text>
          {isCustom ? (
            <IconButton
              icon={{ name: 'pencil' }}
              style={styles.editTokenButton}
              tooltip={t('button.editCustomToken')}
              onPress={this.bind(this._onPressEditCustomToken, symbol)}
            />
          ) : null}
        </View>
        <View style={styles.tokenRowRight}>
          <ErrorBox error={error} style={styles.tokenErrorBox} />
          {balance ? (
            <TokenBalance
              balance={balance}
              decimals={decimals}
              textStyle={styles.tokenBalanceText}
            />
          ) : null}
          <ProgressButton
            tooltip={t('wallet.tokens.checkBalance')}
            style={styles.tokenCheckButton}
            onPress={this.bind(this._onCheckTokenBalance, symbol)}
            showInProgress={checkingBalance[symbol]}
          >
            <Icon name='refresh' />
          </ProgressButton>
        </View>
      </React.Fragment>
    )
  }

  _onPressToggleShowAllTokens = () => (
    this.setState({ showAllTokens: !this.state.showAllTokens })
  )

  _onPressAddToken = () => {
    const { showEditTokenModal } = this.props.actions

    showEditTokenModal()
  }

  _onPressEditCustomToken = symbol => {
    const { showEditTokenModal } = this.props.actions

    showEditTokenModal(symbol)
  }

  _onCheckTokenBalance = symbol => {
    const { account: { address } } = this.props
    const { loadTokenBalance } = this.props.actions

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
      loadTokenBalance(symbol, address)
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
}
