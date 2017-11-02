import { takeLatest, call } from 'redux-saga/effects'

import { LOAD_CONFIG } from './actions'
import saga, { _privateFunctions } from './sagas'

describe('config saga', () => {
  it('waits for LOAD_CONFIG action', () => {
    const app = {}

    const gen = saga(app)()

    expect(gen.next().value).toEqual(takeLatest(LOAD_CONFIG, _privateFunctions.onLoadConfig, app))
  })

  it('and then sets up the node connector', () => {
    const app = {
      nodeConnector: {
        setNetworks: jest.fn()
      }
    }

    const gen = _privateFunctions.onLoadConfig(app, {
      payload: {
        networks: 123
      }
    })

    expect(gen.next().value).toEqual(
      call([ app.nodeConnector, 'setNetworks' ], 123)
    )
  })
})
