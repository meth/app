import Immutable from 'immutable'

import { createAction } from '../utils'
import fn from './middleware'
import { LOAD_CONFIG } from './actions'


describe('config middleware', () => {
  it('passes actions through', async () => {
    const next = jest.fn()

    const handler = fn({})()(next)

    const action = createAction('blah')

    await handler(action)

    expect(next).toHaveBeenCalledTimes(1)
    expect(next).toHaveBeenCalledWith(action)
  })

  describe('processes the LOAD_CONFIG action', () => {
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

      await handler(createAction(LOAD_CONFIG))

      expect(next).toHaveBeenCalledTimes(1)
      expect(next).toHaveBeenCalledWith(
        createAction(LOAD_CONFIG, {
          networks: 'networks loaded',
          nodes: 'nodes loaded'
        })
      )
    })

    it('unless config is already loaded', async () => {
      const next = jest.fn()

      const store = {
        getState: () => ({
          config: Immutable.Map({
            nodes: 23
          })
        })
      }

      const handler = fn({})(store)(next)

      await handler(createAction(LOAD_CONFIG))
      await handler(createAction(LOAD_CONFIG))
      await handler(createAction(LOAD_CONFIG))

      expect(next).not.toHaveBeenCalled()
    })
  })
})
