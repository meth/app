import BN from 'bn.js'
import Immutable from 'immutable'
import { handleActions } from 'redux-actions'

import {
  ACCOUNT_BALANCES,
  ADDRESS_BOOK,
  BOOKMARKS,
  DAPP_PERMISSIONS,
  SAVE_DAPP_PERMISSIONS,
  SAVE_ADDRESS_BOOK_ENTRY,
  DELETE_ADDRESS_BOOK_ENTRY,
  SEND_TX,
  CANCEL_TX,
  TX_COMPLETED
} from './actions'

export default () => {
  const InitialState = Immutable.Map({
    accountBalances: {
      '0xDcc703c0E500B653Ca82273B7BFAd8045D85a470': new BN('12', 10),
      '0xEfd703c0E500B653Ca82273B7BFAd8045D85a471': new BN('5', 10),
      '0xAba703c0E500B653Ca82273B7BFAd8045D85a472': new BN('235', 10)
    },
    addressBook: {
      '0xDcc703c0E500B653Ca82273B7BFAd8045D85a470': {
        label: 'Friendly label 1'
      },
      '0xEfd703c0E500B653Ca82273B7BFAd8045D85a471': {},
      '0xAba703c0E500B653Ca82273B7BFAd8045D85a472': {
        label: 'Bancor network'
      }
    },
    bookmarks: {},
    dappPermissions: {},
    currentTx: null,
    currentTxDeferred: null
  })

  return handleActions(
    {
      [ACCOUNT_BALANCES]: (state, { payload }) => state.set('accountBalances', payload),
      /* bookmarks */
      [BOOKMARKS]: (state, { payload }) => state.set('bookmarks', payload),
      /* dapp permissions */
      [DAPP_PERMISSIONS]: (state, { payload }) => state.set('dappPermissions', payload),
      [SAVE_DAPP_PERMISSIONS]: (state, { payload: { dappId, permissions } }) =>
        state.set('dappPermissions', {
          ...state.get('dappPermissions'),
          [dappId]: permissions
        }),
      /* address book */
      [ADDRESS_BOOK]: (state, { payload: book }) => {
        if (book) {
          return state.set('addressBook', book)
        }

        return state
      },
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
      [SEND_TX]: (state, { payload: { tx, deferred } }) => (
        state
          .set('currentTx', tx)
          .set('currentTxDeferred', deferred)
      ),
      [CANCEL_TX]: state => state.set('currentTxDeferred', null),
      [TX_COMPLETED]: state => state.set('currentTxDeferred', null)
    },
    InitialState
  )
}
