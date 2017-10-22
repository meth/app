import Immutable from 'immutable'

import { createAction } from '../utils'
import fn from './middleware'
import { INIT } from './actions'


describe('config middleware', () => {
  it('passes actions through', async () => {
    const next = jest.fn()

    const handler = fn({})()(next)

    const action = createAction('blah')

    await handler(action)

    expect(next).toHaveBeenCalledTimes(1)
    expect(next).toHaveBeenCalledWith(action)
  })

  describe('processes the INIT action', () => {
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

      await handler(createAction(INIT))

      expect(next).toHaveBeenCalledTimes(1)
      expect(next).toHaveBeenCalledWith(
        createAction(INIT, {
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

      await handler(createAction(INIT))
      await handler(createAction(INIT))
      await handler(createAction(INIT))

      expect(next).not.toHaveBeenCalled()
    })
  })
})
