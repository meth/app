import { SHOW, HIDE } from './actions'
import { CONNECT_NODE, SEND_TRANSACTION, ALERT } from '../../constants/modals'

import {
  showAlert,
  showErrorAlert,
  hideAlert,
  showConnectionModal,
  hideConnectionModal,
  showSendTransactionModal,
  hideSendTransactionModal
} from './actionCreators'

describe('showAlert()', () => {
  it('returns action', () => {
    expect(showAlert('this is the msg')).toEqual({
      type: SHOW,
      payload: { type: ALERT, data: { type: 'info', msg: 'this is the msg' } }
    })
  })
})

describe('showErrorAlert()', () => {
  it('returns action', () => {
    expect(showErrorAlert('this is the msg')).toEqual({
      type: SHOW,
      payload: { type: ALERT, data: { type: 'error', msg: 'this is the msg' } }
    })
  })
})

describe('hideAlert()', () => {
  it('returns action', () => {
    expect(hideAlert()).toEqual({
      type: HIDE,
      payload: { type: ALERT }
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
