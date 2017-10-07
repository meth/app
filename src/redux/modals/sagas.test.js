import { takeLatest, put } from 'redux-saga/effects'

import { INIT } from '../config/actions'
import { TX_SENDING } from '../wallet/actions'
import saga, { _privateFunctions } from './sagas'
import { showConnectionModal, showSendTransactionModal } from './actionCreators'

describe('modal saga', () => {
  describe('waits for INIT action', () => {
    it('and processes it', () => {
      const gen = saga()

      expect(gen.next().value).toEqual(takeLatest(INIT, _privateFunctions.onInit))
    })

    it('and then shows the connection modal', () => {
      const gen = _privateFunctions.onInit()

      expect(gen.next().value).toEqual(put(showConnectionModal()))
    })
  })

  describe('waits for TX_SENDING action', () => {
    it('and processes it', () => {
      const gen = saga()

      gen.next()

      expect(gen.next().value).toEqual(takeLatest(TX_SENDING, _privateFunctions.onSendTransaction))
    })

    it('and then shows the send tx modal', () => {
      const gen = _privateFunctions.onSendTransaction()

      expect(gen.next().value).toEqual(put(showSendTransactionModal()))
    })
  })
})
