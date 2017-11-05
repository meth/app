import { createActionCreator } from '../utils'

import { SHOW, HIDE } from './actions'
import { CONNECT_NODE, SEND_TRANSACTION, ALERT } from '../../utils/modals'

export const alert = createActionCreator(SHOW, msg => ({
  type: ALERT,
  msg
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
