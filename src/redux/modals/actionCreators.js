import { createActionCreator } from '../utils'

import { SHOW, HIDE } from './actions'
import { CONNECT_NODE, SEND_TRANSACTION, ALERT, LOG } from '../../constants/modals'

export const showAlert = createActionCreator(SHOW, msg => ({
  type: ALERT,
  data: {
    type: 'info',
    msg
  }
}))

export const showErrorAlert = createActionCreator(SHOW, msg => ({
  type: ALERT,
  data: {
    type: 'error',
    msg
  }
}))

export const hideAlert = createActionCreator(HIDE, () => ({ type: ALERT }))

export const showLog = createActionCreator(SHOW, () => ({
  type: LOG
}))
export const hideLog = createActionCreator(HIDE, () => ({
  type: LOG
}))

export const showConnectionModal = createActionCreator(SHOW, () => ({
  type: CONNECT_NODE
}))
export const hideConnectionModal = createActionCreator(HIDE, () => ({
  type: CONNECT_NODE
}))

export const showSendTransactionModal = createActionCreator(
  SHOW,
  () => ({ type: SEND_TRANSACTION })
)
export const hideSendTransactionModal = createActionCreator(
  HIDE,
  () => ({ type: SEND_TRANSACTION })
)
