import { createAction } from '../utils'
import fn from './middleware'
import { SEND_RAW_TX, GENERATE_RAW_TX } from './actions'

describe('wallet middleware', () => {
  it('passes actions through', async () => {
    const next = jest.fn()

    const handler = fn({})()(next)

    const action = createAction('blah')

    await handler(action)

    expect(next).toHaveBeenCalledTimes(1)
    expect(next).toHaveBeenCalledWith(action)
  })

  describe('processes the GENERATE_RAW_TX action', () => {
    it('and returns the raw tx string', async () => {
      const next = jest.fn()

      const handler = fn({})()(next)

      const action = createAction(GENERATE_RAW_TX, {
        host: 'meth'
      })

      const ret = await handler(action)

      expect(ret).toEqual('0xdeadbeef')
      expect(next).not.toHaveBeenCalledWith(action)
    })
  })

  describe('processes the SEND_RAW_TX action', () => {
    it('and returns success', async () => {
      const next = jest.fn()

      const handler = fn({})()(next)

      const action = createAction(SEND_RAW_TX, 'test')

      const ret = await handler(action)

      expect(ret).toEqual(123)
      expect(next).not.toHaveBeenCalledWith(action)
    })
  })
})
