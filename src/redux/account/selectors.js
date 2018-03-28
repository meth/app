import { createSelector } from 'reselect'

const _getAccountBalances = state => state.account.get('accountBalances') || {}
const _getAccountFriendlyNames = state => state.account.get('accountFriendlyNames') || {}

export const getAddresses = createSelector(
  _getAccountBalances,
  _getAccountFriendlyNames,
  (balances, names) => Object.keys(balances).reduce((m, addr) => ({
    ...m,
    [addr]: {
      balance: balances[addr],
      ...(names[addr] ? { name: names[addr] } : {})
    }
  }), {})
)

export const getBookMarks = state => state.account.get('bookmarks') || []

export const getDappPermissions = state => state.account.get('dappPermissions') || {}
