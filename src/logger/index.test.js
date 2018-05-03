/* eslint-disable no-console */

import logger, { setStore } from './index'

describe('logger', () => {
  beforeEach(() => {
    this.consoleMethods = {}
    ;[ 'debug', 'info', 'warn', 'error' ].forEach(method => {
      this.consoleMethods[method] = console[method]

      console[method] = jest.fn()
    })
  })

  afterEach(() => {
    ;[ 'debug', 'info', 'warn', 'error' ].forEach(method => {
      console[method] = this.consoleMethods[method]
    })
  })

  it('.debug()', () => {
    logger.debug(1, 2)

    expect(console.debug).toHaveBeenCalledWith('Meth[DEBUG]: 1')
    expect(console.debug).toHaveBeenCalledWith('Meth[DEBUG]: 2')
  })

  it('.info()', () => {
    logger.info(1, 2)

    expect(console.info).toHaveBeenCalledWith('Meth[INFO]: 1')
    expect(console.info).toHaveBeenCalledWith('Meth[INFO]: 2')
  })

  it('.warn()', () => {
    logger.warn(1, 2)

    expect(console.warn).toHaveBeenCalledWith('Meth[WARN]: 1')
    expect(console.warn).toHaveBeenCalledWith('Meth[WARN]: 2')
  })

  it('.error()', () => {
    logger.error(1, 2)

    expect(console.error).toHaveBeenCalledWith('Meth[ERROR]: 1')
    expect(console.error).toHaveBeenCalledWith('Meth[ERROR]: 2')
  })

  describe('.setStore()', () => {
    describe('sets a redux store to use', () => {
      let store

      beforeEach(() => {
        store = {
          actions: {
            infoEvent: jest.fn(),
            warnEvent: jest.fn(),
            errorEvent: jest.fn()
          }
        }

        setStore(store)
      })

      afterEach(() => {
        setStore(null)
      })

      it('and logs info events', () => {
        logger.info(1, 2)

        expect(store.actions.infoEvent).toHaveBeenCalledWith(`1\n2`, 'Meth')
      })

      it('and logs warn events', () => {
        logger.warn(1, 2)

        expect(store.actions.warnEvent).toHaveBeenCalledWith(`1\n2`, 'Meth')
      })

      it('and logs error events', () => {
        logger.error(1, 2)

        expect(store.actions.errorEvent).toHaveBeenCalledWith(`1\n2`, 'Meth')
      })
    })
  })
})
