import { takeLatest, put, select } from 'redux-saga/effects'

import { SEND_RAW_TX } from '../wallet/actions'
import { TX_COMPLETED } from './actions'
import { createAction } from '../utils'
import { getTxDeferred } from './selectors'
import saga, { _privateFunctions } from './sagas'

describe('api saga', () => {
  describe('waits for SEND_RAW_TX action', () => {
    it('and processes it', () => {
      const app = {}

      const gen = saga(app)()

      expect(gen.next().value).toEqual(
        takeLatest(SEND_RAW_TX, _privateFunctions.onSuccessfulTransaction, app)
      )
    })

    it('and resolves the current transaction deferred object', () => {
      const gen = _privateFunctions.onSuccessfulTransaction({}, {
        payload: 123
      })

      expect(gen.next().value).toEqual(select(getTxDeferred))

      const deferred = {
        resolve: jest.fn()
      }

      gen.next(deferred)

      expect(deferred.resolve).toHaveBeenCalledWith(123)
    })

    it('and then marks the current transation as complete', () => {
      const gen = _privateFunctions.onSuccessfulTransaction({}, {})

      gen.next()

      expect(gen.next().value).toEqual(put(createAction(TX_COMPLETED)))
    })
  })
})
