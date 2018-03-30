import { createSelector } from 'reselect'

import ADDRESS_TYPES from '../../../common/constants/addressTypes'

const _getAccountBalances = state => state.account.get('accountBalances') || {}
const _getAddressBook = state => state.account.get('addressBook') || {}

export const getAccounts = createSelector(
  _getAccountBalances,
  _getAddressBook,
  (balances, addressBook) => Object.keys(balances).reduce((m, addr) => ({
    ...m,
    [addr]: {
      balance: balances[addr],
      ...(addressBook[addr] ? { label: addressBook[addr] } : {})
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
