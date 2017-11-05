import { SHOW, HIDE } from './actions'
import { CONNECT_NODE, SEND_TRANSACTION, ALERT } from '../../utils/modals'

import {
  alert,
  showConnectionModal,
  hideConnectionModal,
  showSendTransactionModal,
  hideSendTransactionModal
} from './actionCreators'

describe('alert()', () => {
  it('returns action', () => {
    expect(alert('this is the msg')).toEqual({
      type: SHOW,
      payload: { type: ALERT, msg: 'this is the msg' }
    })
  })
})

describe('showSendTransactionModal()', () => {
  it('returns action', () => {
    expect(showSendTransactionModal()).toEqual({
      type: SHOW,
      payload: { type: SEND_TRANSACTION }
    })
  })
})

describe('hideSendTransactionModal()', () => {
  it('returns action', () => {
    expect(hideSendTransactionModal()).toEqual({
      type: HIDE,
      payload: { type: SEND_TRANSACTION }
    })
  })
})

describe('showConnectionModal()', () => {
  it('returns action', () => {
    expect(showConnectionModal()).toEqual({
      type: SHOW,
      payload: { type: CONNECT_NODE }
    })
  })
})

describe('hideConnectionModal()', () => {
  it('returns action', () => {
    expect(hideConnectionModal()).toEqual({
      type: HIDE,
      payload: { type: CONNECT_NODE }
    })
  })
})
