import EventEmitter from 'eventemitter3'


import scheduler from '../../scheduler'
import { Adapter } from './base'
import EVENT from '../../../common/constants/events'
import STATE from '../../../common/constants/states'
import {
  UnableToConnectError,
  RequestTimeoutError,
  CorruptDataError
} from '../../utils/errors'


jest.mock('../../scheduler', () => require('method-mocks').setupMethodMocks())



describe('Base adapter', () => {
  let b

  beforeEach(() => {
    b = new Adapter('config', 'type', 'methods')
  })

  it('is an event emitter', () => {
    expect(b).toBeInstanceOf(EventEmitter)
  })

  describe('.isConnected', () => {
    it('returns true if connected', () => {
      b._state = null

      expect(b.isConnected).toEqual(false)
    })

    it('returns true if connected', () => {
      b._state = STATE.CONNECTED

      expect(b.isConnected).toEqual(true)
    })
  })

  describe('.state', () => {
    it('returns current state', () => {
      b._state = STATE.DISCONNECTED
      expect(b.state).toEqual(STATE.DISCONNECTED)

      b._state = 123
      expect(b.state).toEqual(123)
    })
  })

  describe('._updateState', () => {
    it('updates current state', () => {
      b._state = STATE.DISCONNECTED

      b._updateState(STATE.CONNECTED)

      expect(b._state).toEqual(STATE.CONNECTED)
    })

    it('emits an event if new state is different to previous', () => {
      const spy = jest.fn()

      b.on(EVENT.STATE_CHANGE, spy)

      b._state = STATE.DISCONNECTED
      b._updateState(STATE.DISCONNECTED)

      expect(spy).not.toHaveBeenCalled()

      b._updateState(STATE.CONNECTED)
      expect(spy).toHaveBeenCalledWith(STATE.CONNECTED)
    })
  })

  describe('.connect', () => {
    let connectPromise

    beforeEach(() => {
      b._updateState = jest.fn()
      b._connect = jest.fn(() => connectPromise)
      b._startPoll = jest.fn()
    })

    it('does nothing if already connected', async () => {
      b._state = STATE.CONNECTED

      await b.connect()

      expect(b._state).toEqual(STATE.CONNECTED)
      expect(b._connect).not.toHaveBeenCalled()
    })

    it('does nothing and returns existing connecting promise if already connecting', async () => {
      b._state = STATE.CONNECTING
      b._connectPromise = 123

      expect(await b.connect()).toEqual(123)

      expect(b._state).toEqual(STATE.CONNECTING)
      expect(b._connect).not.toHaveBeenCalled()
    })

    it('handles connection errors', async () => {
      connectPromise = Promise.reject(new Error('test'))

      try {
        await b.connect()
      } catch (_) {
        expect(b._connect).toHaveBeenCalled()
        expect(b._connectPromise).toEqual(connectPromise)
        expect(b._updateState).toHaveBeenCalledTimes(2)
        expect(b._updateState).toHaveBeenCalledWith(STATE.CONNECTING)
        expect(b._updateState).toHaveBeenCalledWith(STATE.CONNECT_ERROR)
      }
    })

    it('handles connection succes', async () => {
      connectPromise = Promise.resolve(123)

      expect(await b.connect()).toEqual(true)

      expect(b._connect).toHaveBeenCalled()
      expect(b._connectPromise).toEqual(null)
      expect(b._updateState).toHaveBeenCalledTimes(2)
      expect(b._updateState).toHaveBeenCalledWith(STATE.CONNECTING)
      expect(b._updateState).toHaveBeenCalledWith(STATE.CONNECTED)
      expect(b._startPoll).toHaveBeenCalled()
    })
  })

  describe('.disconnect', () => {
    let disconnectPromise

    beforeEach(() => {
      b._state = STATE.CONNECTED
      b._updateState = jest.fn()
      b._disconnect = jest.fn(() => disconnectPromise)
      b._stopPoll = jest.fn()
    })

    it('does nothing if already disconnected', async () => {
      b._state = STATE.DISCONNECTED

      await b.disconnect()

      expect(b._state).toEqual(STATE.DISCONNECTED)
      expect(b._disconnect).not.toHaveBeenCalled()
    })

    it('does nothing and returns existing disconnecting promise if already disconnecting', async () => {
      b._state = STATE.DISCONNECTING
      b._disconnectPromise = 123

      expect(await b.disconnect()).toEqual(123)

      expect(b._state).toEqual(STATE.DISCONNECTING)
      expect(b._disconnect).not.toHaveBeenCalled()
    })

    it('handles disconnection errors', async () => {
      disconnectPromise = Promise.reject(new Error('test'))

      try {
        await b.disconnect()
      } catch (_) {
        expect(b._disconnect).toHaveBeenCalled()
        expect(b._disconnectPromise).toEqual(disconnectPromise)
        expect(b._updateState).toHaveBeenCalledTimes(1)
        expect(b._updateState).toHaveBeenCalledWith(STATE.DISCONNECTING)
        expect(b._stopPoll).toHaveBeenCalled()
      }
    })

    it('handles disconnection succes', async () => {
      disconnectPromise = Promise.resolve(123)

      await b.disconnect()

      expect(b._disconnect).toHaveBeenCalled()
      expect(b._disconnectPromise).toEqual(null)
      expect(b._updateState).toHaveBeenCalledTimes(2)
      expect(b._updateState).toHaveBeenCalledWith(STATE.DISCONNECTING)
      expect(b._updateState).toHaveBeenCalledWith(STATE.DISCONNECTED)
      expect(b._stopPoll).toHaveBeenCalled()
    })
  })

  describe('.execMethod', () => {
    let execResultPromise

    beforeEach(() => {
      b._callId = 12
      b._doSharedExecMethod = jest.fn(() => execResultPromise)
      b._updateState = jest.fn()
    })

    it('returns result if successful', async () => {
      execResultPromise = Promise.resolve(123)

      expect(await b.execMethod('method', 'params')).toEqual(123)

      expect(b._callId).toEqual(13)
      expect(b._doSharedExecMethod).toHaveBeenCalledWith(13, 'method', 'params')
      expect(b._updateState).toHaveBeenCalledWith(STATE.CONNECTED)
    })

    it('throws error if failed', async () => {
      const e = new Error('test')

      execResultPromise = Promise.reject(e)

      try {
        await b.execMethod('method', 'params')
      } catch (err) {
        expect(err).toEqual(e)
        expect(err.method).toEqual('method')
        expect(err.params).toEqual('params')
        expect(b._updateState).toHaveBeenCalledWith(STATE.CONNECTED)
      }
    })

    it('handles ganache errors well', async () => {
      const e = new Error('test')
      e.message = JSON.stringify({
        message: 'msg'
      })

      execResultPromise = Promise.reject(e)

      try {
        await b.execMethod('method', 'params')
      } catch (err) {
        expect(err).toEqual(e)
        expect(err.method).toEqual('method')
        expect(err.params).toEqual('params')
        expect(err.message).toEqual('msg')
        expect(err.subError).toEqual({ message: 'msg' })
        expect(b._updateState).toHaveBeenCalledWith(STATE.CONNECTED)
      }
    })

    it('update state to disconnected if unable to connect', async () => {
      const e = new UnableToConnectError('test')

      execResultPromise = Promise.reject(e)

      try {
        await b.execMethod('method', 'params')
      } catch (err) {
        expect(b._updateState).toHaveBeenCalledWith(STATE.CONNECTION_ERROR)
      }
    })

    it('update state to disconnected if corrupt data', async () => {
      const e = new CorruptDataError('test')

      execResultPromise = Promise.reject(e)

      try {
        await b.execMethod('method', 'params')
      } catch (err) {
        expect(b._updateState).toHaveBeenCalledWith(STATE.CONNECTION_ERROR)
      }
    })

    it('update state to disconnected if request timeout', async () => {
      const e = new RequestTimeoutError('test')

      execResultPromise = Promise.reject(e)

      try {
        await b.execMethod('method', 'params')
      } catch (err) {
        expect(b._updateState).toHaveBeenCalledWith(STATE.CONNECTION_ERROR)
      }
    })
  })

  describe('._connect', () => {
    let execResultPromise

    beforeEach(() => {
      b.execMethod = jest.fn(() => execResultPromise)
    })

    it('throws error if connection fails', async () => {
      const e = new Error('test')

      execResultPromise = Promise.reject(e)

      try {
        await b._connect()
      } catch (err) {
        expect(b.execMethod).toHaveBeenCalledWith('eth_blockNumber')
        expect(err).toEqual(e)
      }
    })

    it('can pass', async () => {
      execResultPromise = Promise.resolve(1)

      await b._connect()

      expect(b.execMethod).toHaveBeenCalledWith('eth_blockNumber')
    })
  })

  describe('._disconnect', () => {
    it('does nothing', async () => {
      expect(await b._disconnect()).toBeUndefined()
    })
  })

  describe('._doSharedExecMethod', () => {
    let checkResultPromise
    let execResultPromise

    beforeEach(() => {
      b._methods = {
        eth_blockNumber: { shareable: true },
        eth_call: {}
      }

      b._callPromises = {}

      checkResultPromise = Promise.resolve()
      execResultPromise = Promise.resolve('data')

      b._checkMethodAllowed = jest.fn(() => checkResultPromise)
      b._doExecMethod = jest.fn(() => execResultPromise)
    })

    it('makes the call for given method and params', async () => {
      const result = await b._doSharedExecMethod(1, 'eth_blockNumber', 123)

      expect(result).toEqual('data')
      expect(Object.keys(b._callPromises)).toEqual([])
    })

    it('sets up shareability for methods which are shareable', async () => {
      const sig = JSON.stringify({ method: 'eth_blockNumber', params: 123 })

      const promise = b._doSharedExecMethod(1, 'eth_blockNumber', 123)

      expect(b._callPromises[sig]).toEqual(promise)
    })

    it('handles case where method is not allowed', async () => {
      const e = new Error('test')

      checkResultPromise = Promise.reject(e)

      try {
        await b._doSharedExecMethod(1, 'eth_blockNumber', 123)
      } catch (err) {
        expect(err).toEqual(e)
        expect(Object.keys(b._callPromises)).toEqual([])
      }
    })

    it('handles case where method execution fails', async () => {
      const e = new Error('test')

      execResultPromise = Promise.reject(e)

      try {
        await b._doSharedExecMethod(1, 'eth_blockNumber', 123)
      } catch (err) {
        expect(err).toEqual(e)
        expect(Object.keys(b._callPromises)).toEqual([])
      }
    })

    it('returns existing promise for shareable method', async () => {
      const sig = JSON.stringify({ method: 'eth_blockNumber', params: 123 })

      b._callPromises[sig] = Promise.resolve('prom')

      const result = await b._doSharedExecMethod(1, 'eth_blockNumber', 123)

      expect(result).toEqual('prom')
    })

    it('does not return existing promise for un-shareable method', async () => {
      const sig = JSON.stringify({ method: 'eth_call', params: 123 })

      b._callPromises[sig] = Promise.resolve('prom')

      const result = await b._doSharedExecMethod(1, 'eth_call', 123)

      expect(result).toEqual('data')
    })

    it('does new request if even just the params differ', async () => {
      const sig = JSON.stringify({ method: 'eth_blockNumber', params: 123 })

      b._callPromises[sig] = 'prom'

      const result = await b._doSharedExecMethod(1, 'eth_blockNumber', 1234)

      expect(result).toEqual('data')
      expect(b._checkMethodAllowed).toHaveBeenCalledWith('eth_blockNumber', 1234)
      expect(b._doExecMethod).toHaveBeenCalledWith(1, 'eth_blockNumber', 1234)
      expect(Object.keys(b._callPromises)).toEqual([ sig ])
    })
  })

  describe('._doExecMethod', () => {
    it('throws an error', async () => {
      await expect(b._doExecMethod()).rejects.toBeInstanceOf(Error)
    })
  })

  describe('._checkMethodAllowed', () => {
    it('throws an error if method not allowed', async () => {
      b._methods = {
        eth_blockNumber: {}
      }

      await expect(b._checkMethodAllowed('eth_call')).rejects.toBeInstanceOf(Error)
    })

    it('does not throw an error if method allowed', async () => {
      b._methods = {
        eth_call: {}
      }

      await expect(b._checkMethodAllowed('eth_call')).resolves.toBeUndefined()
    })
  })

  describe('_startPoll', () => {
    let addJobSpy

    beforeEach(() => {
      b._doPoll = jest.fn()

      addJobSpy = scheduler.setMethodMock('addJob', jest.fn(() => 123))
    })

    afterEach(() => {
      scheduler.clearAllMethodMocks()
    })

    it('sets up scheduled polling', () => {
      b._startPoll()

      expect(b._poll).toEqual(123)

      const call = addJobSpy.mock.calls[0]
      expect(call.length).toEqual(3)
      expect(call[0]).toEqual('block_poll')
      expect(call[1]).toEqual(15)
    })

    it('sets up callback to poll function', () => {
      b._startPoll()

      const cb = addJobSpy.mock.calls[0][2]

      cb()

      expect(b._doPoll).toHaveBeenCalled()
    })
  })

  describe('_stopPoll', () => {
    let removeJobSpy

    beforeEach(() => {
      removeJobSpy = scheduler.setMethodMock('removeJob', jest.fn())
    })

    afterEach(() => {
      scheduler.clearAllMethodMocks()
    })

    it('removes scheduled job if exists', () => {
      b._poll = 123

      b._stopPoll()

      expect(removeJobSpy).toHaveBeenCalledWith(123)
      expect(b._poll).toBeUndefined()
    })
  })
})
