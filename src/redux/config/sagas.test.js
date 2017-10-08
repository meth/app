import { takeLatest, call } from 'redux-saga/effects'

import { INIT } from './actions'
import saga, { _privateFunctions } from './sagas'

describe('config saga', () => {
  it('waits for INIT action', () => {
    const app = {}

    const gen = saga(app)()

    expect(gen.next().value).toEqual(takeLatest(INIT, _privateFunctions.onInit, app))
  })

  it('and then sets up the node connector', () => {
    const app = {
      nodeConnector: {}
    }

    const gen = _privateFunctions.onInit(app, {
      payload: {
        networks: 123
      }
    })

    expect(gen.next().value).toEqual(
      call([ app.nodeConnector, 'setNetworks' ], 123)
    )
  })
})
