import { createAction } from 'redux-actions'

import fn from './middleware'

import { REQUEST } from './actions'

describe('web3 middleware', () => {
  it('passes actions through', async () => {
    const next = jest.fn()

    const handler = fn({})()(next)

    const action = createAction('blah')

    await handler(action)

    expect(next).toHaveBeenCalledTimes(1)
    expect(next).toHaveBeenCalledWith(action)
  })

  describe('processes the REQUEST action', () => {
    it('by passing on the request to the node connector', async () => {
      const next = jest.fn()

      const nodeConnector = {
        request: jest.fn(() => Promise.resolve(123))
      }

      const handler = fn({ nodeConnector })({})(next)

      const res = await handler(createAction(REQUEST)({
        master: 'blaster'
      }))

      expect(res).toEqual(123)

      expect(next).not.toHaveBeenCalled()

      expect(nodeConnector.request).toHaveBeenCalledWith({
        master: 'blaster'
      })
    })
  })
})
