import { createAction } from '../utils'
import fn from './middleware'
import { WEB3_REQUEST, GENERATE_ACCOUNT } from './actions'


describe('api middleware', () => {
  it('passes actions through', async () => {
    const next = jest.fn()

    const handler = fn({})()(next)

    const action = createAction('blah')

    await handler(action)

    expect(next).toHaveBeenCalledTimes(1)
    expect(next).toHaveBeenCalledWith(action)
  })

  describe('processes the WEB3_REQUEST action', () => {
    it('by passing on the request to the node connector', async () => {
      const next = jest.fn()

      const nodeConnector = {
        request: jest.fn(() => Promise.resolve(123))
      }

      const handler = fn({ nodeConnector })({})(next)

      const res = await handler(createAction(WEB3_REQUEST, {
        master: 'blaster'
      }))

      expect(res).toEqual(123)

      expect(next).not.toHaveBeenCalled()

      expect(nodeConnector.request).toHaveBeenCalledWith({
        master: 'blaster'
      })
    })
  })

  describe('processes the GENERATE_ACCOUNT action', () => {
    it('by passing on the request to the wallet', async () => {
      const next = jest.fn()

      const walletManager = {
        wallet: () => ({
          generateAccount: () => 123
        })
      }

      const handler = fn({ walletManager })({})(next)

      const res = await handler(createAction(GENERATE_ACCOUNT))

      expect(res).toEqual(123)

      expect(next).not.toHaveBeenCalled()
    })
  })
})
