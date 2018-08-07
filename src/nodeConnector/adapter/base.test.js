import EventEmitter from 'eventemitter3'

import { Adapter } from './base'
import EVENT from '../../../common/constants/events'
import STATE from '../../../common/constants/states'

jest.mock('../../scheduler', () => {})



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
})
