import { createSelector } from 'reselect'

const getAccounts = state => state.wallet.get('accounts') || {}

export const getAccountBalances = createSelector(
  getAccounts,
  accounts => Object.keys(accounts).reduce((m, addr) => ({
    ...m,
    [addr]: accounts[addr].balance
  }), {})
)
