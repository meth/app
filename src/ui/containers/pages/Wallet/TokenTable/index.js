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
import TableFilterRow from '../../../../components/TableFilterRow'

const RENDER_NULL = () => null
const TOKEN_COLUMNS = [ { id: 'address' } ]

@connectStore('account')
export default class TokenTable extends CachePureComponent {
  static propTypes = {
    account: PropTypes.object.isRequired
  }

  state = {
    checkingBalance: {},
    showTokensWithBalancesFirst: false
  }

  render () {
    const { account, style } = this.props
    const { showTokensWithBalancesFirst } = this.state
    const { getTokenList } = this.props.selectors

    const tokens = getTokenList()
    const tokenSymbols = Object.keys(tokens)

    let haveBalances = false

    const rows = tokenSymbols.map(token => {
      const { name, decimals, isCustom } = (tokens[token] || {})
      const balance = _.get(account.tokens, token)

      haveBalances = haveBalances || (!!balance)

      return {
        symbol: { value: token },
        meta: { name, balance, decimals, isCustom },
        _filterKey: `${token} ${name || ''}`
      }
    })

    if (showTokensWithBalancesFirst && haveBalances) {
      rows.sort(({ meta: { balance: balance1 } }, { meta: { balance: balance2 } }) => {
        if (balance1 && balance2) {
          return balance1.gt(balance2) ? 1 : -1
        } else if (balance2) {
          return 1
        }

        return -1
      })
    }

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
    const { showTokensWithBalancesFirst } = this.state

    return (
      <TableFilterRow
        style={styles.tableFilterRow}
        renderFilter={defaultRenderFunc}
      >
        <IconButton
          icon={{ name: 'sort-variant' }}
          style={styles.tableFilterButton}
          tooltip={t(`button.showTokensWithBalancesFirst`)}
          onPress={this._onPressShowTokensWithBalancesFirst}
          stateOverride={showTokensWithBalancesFirst ? {
            buttonState: 'hover'
          } : null}
        />
        <IconButton
          icon={{ name: 'plus' }}
          style={styles.tableAddButton}
          tooltip={t('button.addCustomToken')}
          onPress={this._onPressAddToken}
        />
      </TableFilterRow>
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
              type='textWithBorder'
              icon={{ name: 'pencil', style: styles.editTokenButtonText }}
              style={styles.editTokenButton}
              tooltip={t('button.editCustomToken')}
              onPress={this.bind(this._onPressEditCustomToken, symbol)}
            />
          ) : null}
        </View>
        <View style={styles.tokenRowRight}>
          <ErrorBox error={error} style={styles.tokenErrorBox} />
          {(0 <= balance) ? (
            <TokenBalance
              balance={balance}
              decimals={decimals}
              textStyle={styles.tokenBalanceText}
            />
          ) : null}
          <ProgressButton
            type='textWithBorder'
            tooltip={t('wallet.tokens.checkBalance')}
            style={styles.tokenCheckButton}
            onPress={this.bind(this._onCheckTokenBalance, symbol)}
            showInProgress={checkingBalance[symbol]}
            childShouldInheritTextStyle={true}
          >
            <Icon name='refresh' style={styles.tokenCheckButtonText} />
          </ProgressButton>
        </View>
      </React.Fragment>
    )
  }

  _onPressShowTokensWithBalancesFirst = () => (
    this.setState({
      showTokensWithBalancesFirst: !this.state.showTokensWithBalancesFirst
    })
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
      fetchTokenBalance(symbol, address)
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
