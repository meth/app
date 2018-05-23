// import BN from 'bn.js'
import Immutable from 'immutable'
import { handleActions } from 'redux-actions'

import {
  INJECT_ACCOUNT_BALANCES,
  INJECT_ADDRESS_BOOK,
  INJECT_BOOKMARKS,
  INJECT_CUSTOM_TOKENS,
  INJECT_DAPP_PERMISSIONS,
  INJECT_TRANSACTION_HISTORY,
  FETCH_TOKEN_BALANCE,
  SAVE_DAPP_PERMISSIONS,
  SAVE_ADDRESS_BOOK_ENTRY,
  DELETE_ADDRESS_BOOK_ENTRY,
  SEND_TX,
  CANCEL_TX,
  TX_FLOW_COMPLETED,
  CHECK_PENDING_TRANSACTIONS,
  ADD_CUSTOM_TOKEN,
  UPDATE_CUSTOM_TOKEN,
  REMOVE_CUSTOM_TOKEN
} from './actions'

export default () => {
  const InitialState = Immutable.Map({
    accountBalances: {},
    tokenBalances: Immutable.Map({}),
    customTokens: Immutable.Map({}),
    addressBook: {},
    bookmarks: {},
    dappPermissions: {},
    currentTx: null,
    currentTxDeferred: null,
    transactionHistory: []
  })

  return handleActions(
    {
      [INJECT_ACCOUNT_BALANCES]: (state, { payload }) => {
        // ensure there is a token balance entry for each address
        let tokenBalances = state.get('tokenBalances')

        Object.keys(payload).forEach(accountAddress => {
          if (!tokenBalances.get(accountAddress)) {
            tokenBalances = tokenBalances.set(accountAddress, Immutable.Map({}))
          }
        })

        return state
          .set('accountBalances', payload)
          .set('tokenBalances', tokenBalances)
      },
      [FETCH_TOKEN_BALANCE]: (state, { payload: { symbol, accountAddress, balance } }) => {
        let tokenBalances = state.get('tokenBalances')

        let accountEntry = tokenBalances.get(accountAddress)
        accountEntry = accountEntry.set(symbol, balance)
        tokenBalances = tokenBalances.set(accountAddress, accountEntry)

        return state.set('tokenBalances', tokenBalances)
      },
      /* bookmarks */
      [INJECT_BOOKMARKS]: (state, { payload }) => state.set('bookmarks', payload),
      /* dapp permissions */
      [INJECT_DAPP_PERMISSIONS]: (state, { payload }) => state.set('dappPermissions', payload),
      [SAVE_DAPP_PERMISSIONS]: (state, { payload: { dappId, permissions } }) =>
        state.set('dappPermissions', {
          ...state.get('dappPermissions'),
          [dappId]: permissions
        }),
      /* address book */
      [INJECT_ADDRESS_BOOK]: (state, { payload: book = [] }) => (
        state.set('addressBook', book.reduce((m, v) => {
          // eslint-disable-next-line no-param-reassign
          m[v.address] = v
          return m
        }, {}))
      ),
      [SAVE_ADDRESS_BOOK_ENTRY]: (state, { payload: { address, data } }) =>
        state.set('addressBook', {
          ...state.get('addressBook'),
          [address]: data
        }),
      [DELETE_ADDRESS_BOOK_ENTRY]: (state, { payload: { address } }) => {
        const addressBook = state.get('addressBook')

        delete addressBook[address]

        return state.set('addressBook', {
          ...addressBook
        })
      },
      /* custom tokens */
      [INJECT_CUSTOM_TOKENS]: (state, { payload = [] }) => (
        state.set('customTokens', Immutable.Map(payload.reduce((m, v) => {
          // eslint-disable-next-line no-param-reassign
          m[v.symbol] = v
          return m
        }, {})))
      ),
      [ADD_CUSTOM_TOKEN]: (state, { payload: { symbol, details } }) => {
        const customTokens = state.get('customTokens')

        return state.set('customTokens', customTokens.set(symbol, {
          ...details,
          symbol
        }))
      },
      [UPDATE_CUSTOM_TOKEN]: (state, { payload: { symbol, details } }) => {
        let customTokens = state.get('customTokens')

        customTokens = customTokens.delete(symbol).set(symbol, details)

        return state.set('customTokens', customTokens)
      },
      [REMOVE_CUSTOM_TOKEN]: (state, { payload: { symbol } }) => {
        const customTokens = state.get('customTokens')

        return state.set('customTokens', customTokens.delete(symbol))
      },
      /* transactions */
      [INJECT_TRANSACTION_HISTORY]: (state, { payload = [] }) => (
        state.set('transactionHistory', payload)
      ),
      [SEND_TX]: (state, { payload: { tx, deferred } }) => (
        state
          .set('currentTx', tx)
          .set('currentTxDeferred', deferred)
      ),
      [CANCEL_TX]: state =>
        state
          .set('currentTx', null)
          .set('currentTxDeferred', null),
      [TX_FLOW_COMPLETED]: (state, { payload: { id, params } }) =>
        state
          .set(
            'transactionHistory',
            [ { id, params, ts: Date.now() } ].concat(state.get('transactionHistory'))
          )
          .set('currentTx', null)
          .set('currentTxDeferred', null),
      [CHECK_PENDING_TRANSACTIONS]: (state, { payload: updatedTransactions }) => {
        const txHistory = state.get('transactionHistory')

        for (let i = 0; txHistory.length > i; i += 1) {
          const matching = updatedTransactions.find(({ id }) => id === txHistory[i].id)

          if (matching) {
            txHistory.splice(i, 1, matching)
          }
        }

        return state.set('transactionHistory', [].concat(txHistory))
      }
    },
    InitialState
  )
}
