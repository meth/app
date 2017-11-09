import Immutable from 'immutable'

import { createAction } from '../utils'
import fn from './middleware'
import { LOAD_ALERTS } from './actions'


describe('log middleware', () => {
  it('passes actions through', async () => {
    const next = jest.fn()

    const handler = fn({})()(next)

    const action = createAction('blah')

    await handler(action)

    expect(next).toHaveBeenCalledTimes(1)
    expect(next).toHaveBeenCalledWith(action)
  })

  describe('processes the LOAD_ALERTS action', () => {
    it('by loading the config', async () => {
      const next = jest.fn()

      const store = {
        getState: () => ({
          config: Immutable.Map({})
        })
      }

      const config = {
        load: arg => `${arg} loaded`
      }

      const handler = fn({ config })(store)(next)

      await handler(createAction(LOAD_ALERTS))

      expect(next).toHaveBeenCalledTimes(1)
      expect(next).toHaveBeenCalledWith(
        createAction(LOAD_ALERTS, 'alerts loaded')
      )
    })
  })
})
