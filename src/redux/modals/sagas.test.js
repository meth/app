import { takeLatest, put } from 'redux-saga/effects'

import { INIT } from '../config/actions'
import { TX_SENDING } from '../wallet/actions'
import { NODE_DISCONNECTED } from '../node/actions'
import saga, { _privateFunctions } from './sagas'
import { showConnectionModal, showSendTransactionModal } from './actionCreators'

describe('modal saga', () => {
  describe('waits for INIT action', () => {
    it('and processes it', () => {
      const app = {}

      const gen = saga(app)()

      expect(gen.next().value).toEqual(takeLatest(INIT, _privateFunctions.onInit, app))
    })

    it('and then shows the connection modal', () => {
      const gen = _privateFunctions.onInit()

      expect(gen.next().value).toEqual(put(showConnectionModal()))
    })
  })

  describe('waits for TX_SENDING action', () => {
    it('and processes it', () => {
      const app = {}

      const gen = saga(app)()

      gen.next()

      expect(gen.next().value).toEqual(
        takeLatest(TX_SENDING, _privateFunctions.onSendTransaction, app)
      )
    })

    it('and then shows the send tx modal', () => {
      const gen = _privateFunctions.onSendTransaction()

      expect(gen.next().value).toEqual(put(showSendTransactionModal()))
    })
  })

  describe('waits for NODE_DISCONNECTED action', () => {
    it('and processes it', () => {
      const app = {}

      const gen = saga(app)()

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
