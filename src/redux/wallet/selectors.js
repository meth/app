import { createSelector } from 'reselect'

const getAccounts = state => state.wallet.get('accounts')

export const getAccountBalances = createSelector(
  getAccounts,
  accounts => Object.keys(accounts).reduce((m, { balance }, addr) => ({
    ...m,
    [addr]: balance
  }))
)
