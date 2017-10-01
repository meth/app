import { createAction } from 'redux-actions'

import fn from './middleware'
import { NODE_IS_CONNECTING } from './actions'
import { ready, inProgress, error, success } from '../../utils/stateMachines'

describe('node middleware', () => {
  it('passes actions through', async () => {
    const next = jest.fn()

    const handler = fn({})()(next)

    const action = createAction('blah')

    await handler(action)

    expect(next).toHaveBeenCalledTimes(1)
    expect(next).toHaveBeenCalledWith(action)
  })

  describe('processes the NODE_IS_CONNECTING action', () => {
    it('and passes it through if its state is not "ready"', async () => {
      const next = jest.fn()

      const store = {
        dispatch: jest.fn(),
        getStateObject: () => ({})
      }

      const handler = fn()(store)(next)

      let action = createAction(NODE_IS_CONNECTING)({
        state: inProgress
      })

      await handler(action)

      expect(store.dispatch).not.toHaveBeenCalled()
      expect(next).toHaveBeenCalledWith(action)

      action = createAction(NODE_IS_CONNECTING)({
        state: error
      })

      await handler(action)

      expect(store.dispatch).not.toHaveBeenCalled()
      expect(next).toHaveBeenCalledWith(action)

      action = createAction(NODE_IS_CONNECTING)({
        state: success
      })

      await handler(action)

      expect(store.dispatch).not.toHaveBeenCalled()
      expect(next).toHaveBeenCalledWith(action)
    })

    it('and intercepts it if its state is "ready"', async () => {
      const next = jest.fn()

      const store = {
        dispatch: jest.fn(),
        getStateObject: () => ({})
      }

      const nodeConnector = {
        connect: jest.fn(data => Promise.resolve({ config: data }))
      }

      const handler = fn({ nodeConnector })(store)(next)

      const action = createAction(NODE_IS_CONNECTING)({
        state: ready
      })

      await handler(action)

      expect(store.dispatch).toHaveBeenCalled()
      expect(next).not.toHaveBeenCalledWith(action)
    })

    describe('and tries to connect if its state is "ready"', () => {
      let next
      let store
      let nodeConnector
      let handler

      beforeEach(async () => {
        next = jest.fn()

        store = {
          dispatch: jest.fn(),
          getStateObject: () => ({})
        }

        nodeConnector = {}

        handler = fn({ nodeConnector })(store)(next)
      })

      it('and dispatches the success action if connection succeeds', async () => {
        const mockConnect = jest.fn(data => Promise.resolve({ config: data }))

        nodeConnector.connect = mockConnect

        const action = createAction(NODE_IS_CONNECTING)({
          state: ready,
          data: 123
        })

        await handler(action)

        expect(store.dispatch).toHaveBeenCalledTimes(2)
        expect(store.dispatch).toHaveBeenCalledWith(createAction(NODE_IS_CONNECTING)({
          state: inProgress
        }))
        expect(store.dispatch).toHaveBeenCalledWith(createAction(NODE_IS_CONNECTING)({
          state: success,
          data: {
            config: 123
          }
        }))
      })
    })
  })
})
