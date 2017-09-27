import { takeLatest, put } from 'redux-saga/effects'

import { INIT } from '../config/actions'
import saga, { _privateFunctions } from './sagas'
import { showConnectionModal } from './actionCreators'

describe('modal saga', () => {
  it('waits for INIT action', () => {
    const gen = saga()

    expect(gen.next().value).toEqual(takeLatest(INIT, _privateFunctions.onInit))
  })

  it('and then shows the connection modal', () => {
    const gen = _privateFunctions.onInit()

    expect(gen.next().value).toEqual(put(showConnectionModal()))
  })
})
