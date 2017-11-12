import { createSelector } from 'reselect'

const _getAccounts = state => state.wallet.get('accounts') || {}
const _getAccountNames = state => state.wallet.get('accountNames') || {}

export const getAccounts = createSelector(
  _getAccounts,
  _getAccountNames,
  (accounts, names) => Object.keys(accounts).reduce((m, addr) => ({
    ...m,
    [addr]: {
      ...accounts[addr],
      ...(names[addr] ? { name: names[addr] } : {})
    }
  }), {})
)
