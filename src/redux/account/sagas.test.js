import { takeLatest } from 'redux-saga/effects'

import { LOAD_WALLET } from './actions'
import saga, { _privateFunctions } from './sagas'

describe('account saga', () => {
  describe('waits for LOAD_WALLET action', () => {
    it('and processes it', () => {
      const app = {}

      const gen = saga(app)()

      expect(gen.next().value).toEqual(
        takeLatest(LOAD_WALLET, _privateFunctions.onLoadWallet, app)
      )
    })

    it('and send the mnemonic to the storage system', () => {
      const storage = {
        setMnemonic: jest.fn(() => 123)
      }

      const gen = _privateFunctions.onLoadWallet({ storage }, {
        payload: 'mnemo1'
      })

      expect(gen.next().value).toEqual(123)

      expect(storage.setMnemonic).toHaveBeenCalledWith('mnemo1')
    })
  })
})
