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
  ADD_CUSTOM_TOKEN,
  UPDATE_CUSTOM_TOKEN,
  REMOVE_CUSTOM_TOKEN
} from './actions'

export default () => {
  const InitialState = Immutable.Map({
    // accountBalances: {
    //   '0xDcc703c0E500B653Ca82273B7BFAd8045D85a470': new BN('12', 10),
    //   '0xEfd703c0E500B653Ca82273B7BFAd8045D85a471': new BN('5891000000000000000', 10),
    //   '0xAba703c0E500B653Ca82273B7BFAd8045D85a472': new BN('235129900000000000000', 10)
    // },
    // addressBook: {
    //   '0xDcc703c0E500B653Ca82273B7BFAd8045D85a470': {
    //     label: 'Friendly label 1'
    //   },
    //   '0xEfd703c0E500B653Ca82273B7BFAd8045D85a471': {},
    //   '0xAba703c0E500B653Ca82273B7BFAd8045D85a472': {
    //     label: 'Bancor network'
    //   }
    // },
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
      [INJECT_ADDRESS_BOOK]: (state, { payload: book }) => (
        state.set('addressBook', book || {})
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
      /* transactions */
      [INJECT_TRANSACTION_HISTORY]: (state, { payload: txHistory }) => (
        state.set('transactionHistory', txHistory || [])
      ),
      /* custom tokens */
      [INJECT_CUSTOM_TOKENS]: (state, { payload }) => state.set('customTokens', Immutable.Map(payload)),
      [ADD_CUSTOM_TOKEN]: (state, { payload: { symbol, details } }) => {
        const customTokens = state.get('customTokens')

        return state.set('customTokens', customTokens.set(symbol, {
          ...details,
          symbol
        }))
      },
      [UPDATE_CUSTOM_TOKEN]: (state, { payload: { symbol, details } }) => {
        let customTokens = state.get('customTokens')

        customTokens = customTokens.delete(symbol).set(details.symbol, details)

        return state.set('customTokens', customTokens)
      },
      [REMOVE_CUSTOM_TOKEN]: (state, { payload: { symbol } }) => {
        const customTokens = state.get('customTokens')

        return state.set('customTokens', customTokens.delete(symbol))
      },
      [SEND_TX]: (state, { payload: { tx, deferred } }) => (
        state
          .set('currentTx', tx)
          .set('currentTxDeferred', deferred)
      ),
      [CANCEL_TX]: state =>
        state
          .set('currentTx', null)
          .set('currentTxDeferred', null),
      [TX_FLOW_COMPLETED]: (state, { payload: params }) =>
        state
          .set('transactionHistory', state.get('transactionHistory').concat({
            ...state.get('currentTx'),
            params
          }))
          .set('currentTx', null)
          .set('currentTxDeferred', null)
    },
    InitialState
  )
}
