import { SHOW, HIDE } from './actions'
import { CONNECT_NODE, SEND_TRANSACTION } from '../../utils/modals'

import {
  showConnectionModal,
  hideConnectionModal,
  showSendTransactionModal,
  hideSendTransactionModal
} from './actionCreators'

describe('showSendTransactionModal()', () => {
  it('returns action', () => {
    expect(showSendTransactionModal()).toEqual({
      type: SHOW,
      payload: SEND_TRANSACTION
    })
  })
})

describe('hideSendTransactionModal()', () => {
  it('returns action', () => {
    expect(hideSendTransactionModal()).toEqual({
      type: HIDE,
      payload: SEND_TRANSACTION
    })
  })
})

describe('showConnectionModal()', () => {
  it('returns action', () => {
    expect(showConnectionModal()).toEqual({
      type: SHOW,
      payload: CONNECT_NODE
    })
  })
})

describe('hideConnectionModal()', () => {
  it('returns action', () => {
    expect(hideConnectionModal()).toEqual({
      type: HIDE,
      payload: CONNECT_NODE
    })
  })
})
