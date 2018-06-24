// import BN from 'bn.js'
import Immutable from 'immutable'
import { handleActions } from 'redux-actions'

import { NODE_DISCONNECTED } from '../node/actions'

import {
  INJECT_ACCOUNT_BALANCES,
  INJECT_ADDRESS_BOOK,
  INJECT_BOOKMARKS,
  INJECT_CUSTOM_TOKENS,
  INJECT_DAPP_PERMISSIONS,
  INJECT_TRANSACTION_HISTORY,
  INJECT_APP_SETTINGS,
  AUTHENTICATED,
  FETCH_TOKEN_BALANCE,
  SAVE_DAPP_PERMISSIONS,
  SAVE_ADDRESS_BOOK_ENTRY,
  DELETE_ADDRESS_BOOK_ENTRY,
  CLOSE_WALLET,
  SIGN_DATA,
  CANCEL_SIGN_DATA,
  SIGN_DATA_FLOW_COMPLETED,
  SEND_TX,
  CANCEL_TX,
  TX_FLOW_COMPLETED,
  CHECK_PENDING_TRANSACTIONS,
  ADD_CUSTOM_TOKEN,
  UPDATE_CUSTOM_TOKEN,
  REMOVE_CUSTOM_TOKEN,
  SAVE_PIN,
  SAVE_BOOKMARK,
  DELETE_BOOKMARK
} from './actions'

export default () => {
  const networkResetState = () => ({
    accountBalances: {},
    tokenBalances: Immutable.Map({}),
    customTokens: Immutable.Map({}),
    addressBook: Immutable.Map({}),
    transactionHistory: [],
    currentTx: null,
    currentTxDeferred: null,
    currentSigning: null,
    currentSigningDeferred: null
  })

  const initialState = () => Immutable.Map({
    appSettings: Immutable.Map({}),
    bookmarks: Immutable.Map({}),
    dappPermissions: {},
    appSettingsLoaded: false,
    userAuthenticated: false,
    ...networkResetState()
  })

  return handleActions(
    {
      [CLOSE_WALLET]: () => initialState(),
      [NODE_DISCONNECTED]: state => {
        const newSubState = networkResetState()

        return Object.keys(newSubState).reduce((s, key) => (
          s.set(key, newSubState[key])
        ), state)
      },
      /* settings and pin */
      [INJECT_APP_SETTINGS]: (state, { payload }) => {
        // data is stored in db as a table/list, so conver to object first
        const obj = payload.reduce((ret, { name, value }) => {
          // eslint-disable-next-line no-param-reassign
          ret[name] = value
          return ret
        }, {})

        return state
          .set('appSettings', Immutable.Map(obj))
          .set('appSettingsLoaded', true)
      },
      [SAVE_PIN]: (state, { payload: pin }) => (
        state.set('appSettings', state.get('appSettings').set('pin', pin))
      ),
      /* track if user authenticated */
      [AUTHENTICATED]: state => state.set('userAuthenticated', true),
      /* accounts and tokens */
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
      [INJECT_BOOKMARKS]: (state, { payload }) => {
        // data is stored in db as a table/list, so conver to object first
        const obj = payload.reduce((ret, { url, label }) => {
          // eslint-disable-next-line no-param-reassign
          ret[url] = label
          return ret
        }, {})


        return state.set('bookmarks', Immutable.Map(obj))
      },
      [SAVE_BOOKMARK]: (state, { payload: { url, label } }) => (
        state.set('bookmarks', state.get('bookmarks').set(url, label))
      ),
      [DELETE_BOOKMARK]: (state, { payload: { url } }) => (
        state.set('bookmarks', state.get('bookmarks').delete(url))
      ),
      /* dapp permissions */
      [INJECT_DAPP_PERMISSIONS]: (state, { payload }) => state.set('dappPermissions', payload),
      [SAVE_DAPP_PERMISSIONS]: (state, { payload: { dappId, permissions } }) =>
        state.set('dappPermissions', {
          ...state.get('dappPermissions'),
          [dappId]: permissions
        }),
      /* address book */
      [INJECT_ADDRESS_BOOK]: (state, { payload: book = [] }) => (
        state.set('addressBook', Immutable.Map(book.reduce((m, v) => {
          // eslint-disable-next-line no-param-reassign
          m[v.address] = v
          return m
        }, {})))
      ),
      [SAVE_ADDRESS_BOOK_ENTRY]: (state, { payload: { address, data } }) => (
        state.set('addressBook', state.get('addressBook').set(address, data))
      ),
      [DELETE_ADDRESS_BOOK_ENTRY]: (state, { payload: { address } }) => (
        state.set('addressBook', state.get('addressBook').delete(address))
      ),
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
      /* data signing */
      [SIGN_DATA]: (state, { payload: { signing, deferred } }) => (
        state
          .set('currentSigning', signing)
          .set('currentSigningDeferred', deferred)
      ),
      [CANCEL_SIGN_DATA]: state => (
        state
          .set('currentSigning', null)
          .set('currentSigningDeferred', null)
      ),
      [SIGN_DATA_FLOW_COMPLETED]: state => (
        state
          .set('currentSigning', null)
          .set('currentSigningDeferred', null)
      ),
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
    initialState()
  )
}
