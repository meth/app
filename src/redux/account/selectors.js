import { createSelector } from 'reselect'

import ADDRESS_TYPES from '../../../common/constants/addressTypes'

const _getAccountBalances = state => state.account.get('accountBalances')
const _getTokenBalances = state => state.account.get('tokenBalances')
const _getAddressBook = state => state.account.get('addressBook')

export const getCustomTokens = state => state.account.get('customTokens').toObject()

export const getAccounts = createSelector(
  _getAccountBalances,
  _getTokenBalances,
  _getAddressBook,
  (balances, tokenBalances, addressBook) => Object.keys(balances).reduce((m, addr) => ({
    ...m,
    [addr]: {
      balance: balances[addr],
      ...(addressBook[addr] ? { label: addressBook[addr].label } : {}),
      tokens: tokenBalances.get(addr).toObject()
    }
  }), {})
)

export const getAddressBook = createSelector(
  _getAccountBalances,
  _getAddressBook,
  (accounts, addressBook) => Object.keys(addressBook).reduce((m, addr) => ({
    ...m,
    [addr]: {
      ...addressBook[addr],
      ...(accounts[addr] ? { type: ADDRESS_TYPES.OWN_ACCOUNT } : {})
    }
  }), {})
)

export const getBookMarks = state => state.account.get('bookmarks') || []

export const getDappPermissions = state => state.account.get('dappPermissions') || {}

export const getTx = state => state.account.get('currentTx')

export const getTxDeferred = state => state.account.get('currentTxDeferred')
