import InfuraAdapter from './infura'
import Fetch from '../../utils/fetch'
import METHODS from './availableMethods'

jest.mock('../../utils/fetch', () => {
  const _Fetch = require('method-mocks').setupMethodMocks({
    loadJSON: (...args) => _Fetch._loadJSON(...args)
  })

  return _Fetch
})

jest.mock('./base', () => {
  class Adapter {
    constructor (...args) {
      this.constructorArgs = args
    }
  }

  return { Adapter }
})

describe('infura adapter', () => {
  let a

  beforeEach(() => {
    a = new InfuraAdapter({ url: 'test.com' })
  })

  it('constructs the adapter', () => {
    expect(a._url).toEqual('test.com')
    expect(a.constructorArgs).toEqual([
      { url: 'test.com' },
      'infura',
      METHODS
    ])
  })

  describe('._doExecMethod', () => {
    let methodAllowedPromise
    let fetchPromise
    let fetchSpy

    beforeEach(() => {
      a._log = {
        trace: jest.fn()
      }
      a._throwError = jest.fn()

      methodAllowedPromise = Promise.resolve()
      a._checkMethodAllowed = jest.fn(() => methodAllowedPromise)

      fetchPromise = Promise.resolve({})
      fetchSpy = Fetch.setMethodMock('_loadJSON', jest.fn(() => fetchPromise))
    })

    it('checks that method is allowed', async () => {
      await a._doExecMethod(1, 'method', 'params')

      expect(a._checkMethodAllowed).toHaveBeenCalledWith('method')
    })

    it('throws error if method not allowed', async () => {
      const e = new Error('test')

      methodAllowedPromise = Promise.reject(e)

      try {
        await a._doExecMethod(1, 'method', 'params')
      } catch (err) {
        expect(err).toEqual(e)
      }
    })

    it('calls loadJSON()', async () => {
      await a._doExecMethod(1, 'method', 'params')

      expect(fetchSpy).toHaveBeenCalledWith(
        'test.com',
        'POST',
        {},
        {
          jsonrpc: '2.0',
          id: 1,
          method: 'method',
          params: 'params'
        }
      )
    })

    it('handles JSON errors', async () => {
      fetchPromise = Promise.resolve({
        error: 'err1'
      })

      await a._doExecMethod(1, 'method', 'params')

      expect(a._throwError).toHaveBeenCalledWith(JSON.stringify('err1'), {
        error: 'err1'
      })
    })

    it('handles load errors', async () => {
      const e = new Error('test')

      fetchPromise = Promise.reject(e)

      try {
        await a._doExecMethod(1, 'method', 'params')
      } catch (err) {
        expect(err).toEqual(e)
      }
    })

    it('returns the result', async () => {
      fetchPromise = Promise.resolve({
        result: 123
      })

      const result = await a._doExecMethod(1, 'method', 'params')

      expect(result).toEqual(123)
    })
  })
})
