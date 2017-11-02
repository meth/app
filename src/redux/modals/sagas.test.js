import { takeLatest, put } from 'redux-saga/effects'

import { SEND_TX, CANCEL_TX } from '../api/actions'
import { NODE_DISCONNECTED } from '../node/actions'
import saga, { _privateFunctions } from './sagas'
import { showConnectionModal, showSendTransactionModal, hideSendTransactionModal } from './actionCreators'

describe('modal saga', () => {
  describe('waits for SEND_TX action', () => {
    it('and processes it', () => {
      const app = {}

      const gen = saga(app)()

      gen.next()

      expect(gen.next().value).toEqual(
        takeLatest(SEND_TX, _privateFunctions.onSendTransaction, app)
      )
    })

    it('and then shows the send tx modal', () => {
      const gen = _privateFunctions.onSendTransaction()

      expect(gen.next().value).toEqual(put(showSendTransactionModal()))
    })
  })

  describe('waits for CANCEL_TX action', () => {
    it('and processes it', () => {
      const app = {}

      const gen = saga(app)()

      gen.next()
      gen.next()

      expect(gen.next().value).toEqual(
        takeLatest(CANCEL_TX, _privateFunctions.onCancelTransaction, app)
      )
    })

    it('and then hides the send tx modal', () => {
      const gen = _privateFunctions.onCancelTransaction()

      expect(gen.next().value).toEqual(put(hideSendTransactionModal()))
    })
  })

  describe('waits for NODE_DISCONNECTED action', () => {
    it('and processes it', () => {
      const app = {}

      const gen = saga(app)()

      gen.next()
      gen.next()
      gen.next()

      expect(gen.next().value).toEqual(
        takeLatest(NODE_DISCONNECTED, _privateFunctions.onNodeDisconnected, app)
      )
    })

    it('and then shows the connection modal', () => {
      const gen = _privateFunctions.onNodeDisconnected()

      expect(gen.next().value).toEqual(put(showConnectionModal()))
    })
  })
})
