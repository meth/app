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
})
