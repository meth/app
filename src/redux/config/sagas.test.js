import { takeLatest, call } from 'redux-saga/effects'

import { INIT } from './actions'
import saga, { _privateFunctions } from './sagas'
import NodeConnector from '../../nodeConnector'

describe('config saga', () => {
  it('waits for INIT action', () => {
    const gen = saga()

    expect(gen.next().value).toEqual(takeLatest(INIT, _privateFunctions.onInit))
  })

  it('and then sets up the node connector', () => {
    const gen = _privateFunctions.onInit({
      payload: {
        networks: 123
      }
    })

    expect(gen.next().value).toEqual(
      call([ NodeConnector, 'setNetworks' ], 123)
    )
  })
})
