import { createActionCreator } from '../utils'

import { SHOW, HIDE } from './actions'
import { CONNECT_NODE, SEND_TRANSACTION } from '../../utils/modals'

export const showConnectionModal = createActionCreator(SHOW, () => CONNECT_NODE)
export const hideConnectionModal = createActionCreator(HIDE, () => CONNECT_NODE)

export const showSendTransactionModal = createActionCreator(
  SHOW,
  () => SEND_TRANSACTION
)
export const hideSendTransactionModal = createActionCreator(
  HIDE,
  () => SEND_TRANSACTION
)
