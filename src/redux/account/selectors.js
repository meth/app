import { createSelector } from 'reselect'

const _getAddressBalances = state => state.account.get('addressBalances') || {}
const _getAddressNames = state => state.account.get('addressNames') || {}

export const getAddresses = createSelector(
  _getAddressBalances,
  _getAddressNames,
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
