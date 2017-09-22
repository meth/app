import { createAction } from 'redux-actions'

import { SHOW, HIDE } from './actions'
import { CONNECT_NODE, SEND_TRANSACTION } from '../../utils/modals'

export const showConnectionModal = createAction(SHOW, () => CONNECT_NODE)
export const hideConnectionModal = createAction(HIDE, () => CONNECT_NODE)

export const showSendTransactionModal = createAction(
  SHOW,
  () => SEND_TRANSACTION
)
export const hideSendTransactionModal = createAction(
  HIDE,
  () => SEND_TRANSACTION
)
