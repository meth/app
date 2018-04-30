import _ from 'lodash'
import { createSelector } from 'reselect'

import ADDRESS_TYPES from '../../../common/constants/addressTypes'

const _getAccountBalances = state => state.account.get('accountBalances')
const _getTokenBalances = state => state.account.get('tokenBalances')
const _getAddressBook = state => state.account.get('addressBook')
const _getCustomTokens = state => state.account.get('customTokens')

export const getCustomTokens = createSelector(
  _getCustomTokens,
  customTokens => customTokens.toObject()
)

export const getAccounts = createSelector(
  _getAccountBalances,
  _getTokenBalances,
  _getAddressBook,
  _getCustomTokens,
  (balances, tokenBalances, addressBook, customTokens) => {
    const customTokensArr = Object.keys(customTokens.toObject())

    return Object.keys(balances).reduce((m, addr) => ({
      ...m,
      [addr]: {
        balance: balances[addr],
        ...(addressBook[addr] ? { label: addressBook[addr].label } : {}),
        tokens: _.pick(tokenBalances.get(addr).toObject(), customTokensArr)
      }
    }), {})
  }
)

export const getAddressBook = createSelector(
  _getAccountBalances,
  _getAddressBook,
  (accounts, addressBook) => {
    const addresses = Object.assign({}, addressBook)

    Object.keys(accounts).forEach(addr => {
      addresses[addr] = Object.assign({}, addresses[addr], {
        type: ADDRESS_TYPES.OWN_ACCOUNT
      })
    })

    return addresses
  }
)

export const getBookMarks = state => state.account.get('bookmarks') || []

export const getDappPermissions = state => state.account.get('dappPermissions') || {}

export const getTx = state => state.account.get('currentTx')

export const getTxDeferred = state => state.account.get('currentTxDeferred')

export const getTransactionHistory = state => state.account.get('transactionHistory')
