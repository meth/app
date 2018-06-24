import { createSelector } from 'reselect'

import ADDRESS_TYPES from '../../../common/constants/addressTypes'

const _getAccountBalances = state => state.account.get('accountBalances')
const _getTokenBalances = state => state.account.get('tokenBalances')
const _getAddressBook = state => state.account.get('addressBook')
const _getCustomTokens = state => state.account.get('customTokens')
const _getAppSettings = state => state.account.get('appSettings')
const _getBookmarks = state => state.account.get('bookmarks')

export const getBookmarks = createSelector(
  _getBookmarks,
  bookmarks => {
    const obj = bookmarks.toObject()

    return Object.keys(obj).map(url => ({
      url, label: obj[url]
    }))
  }
)

export const getSecurityPin = createSelector(
  _getAppSettings,
  settings => settings.get('pin')
)

export const isUserAuthenticated = state => state.account.get('userAuthenticated')

export const areAppSettingsLoaded = state => state.account.get('appSettingsLoaded')

export const getCustomTokens = createSelector(
  _getCustomTokens,
  customTokens => customTokens.toObject()
)

export const getMainAccountAddress = createSelector(
  _getAccountBalances,
  balances => Object.keys(balances)[0]
)

export const getAccounts = createSelector(
  _getAccountBalances,
  _getTokenBalances,
  _getAddressBook,
  (balances, tokenBalances, addressBook) => (
    Object.keys(balances).reduce((m, addr) => ({
      ...m,
      [addr]: {
        balance: balances[addr],
        ...(addressBook.get(addr) ? { label: addressBook.get(addr).label } : {}),
        tokens: tokenBalances.get(addr).toObject()
      }
    }), {})
  )
)

export const getAddressBook = createSelector(
  _getAccountBalances,
  _getAddressBook,
  (accounts, addressBook) => {
    const addresses = Object.assign({}, addressBook.toObject())

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

export const getSigning = state => state.account.get('currentSigning')

export const getSigningDeferred = state => state.account.get('currentSigningDeferred')

export const getTransactionHistory = createSelector(
  state => state.account.get('transactionHistory'),
  history => {
    const r = [ ...history ]
    r.sort((a, b) => (a.ts < b.ts ? -1 : 1))
    return r
  }
)

export const getReverseTransactionHistory = createSelector(
  getTransactionHistory,
  history => {
    const r = [ ...history ]
    r.reverse()
    return r
  }
)
