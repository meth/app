/* eslint-disable global-require */

import IPC from '../constants/ipc'

const dispatchEvent = (eventName, detail) => {
  window.dispatchEvent(new global.CustomEvent(eventName, { detail }))
}

describe('env web', () => {
  beforeEach(() => {
    jest.resetModules()
  })

  it('exports ui task constants', () => {
    expect(require('./index.web')).toMatchObject(
      require('../constants/ipc-ui-tasks')
    )
  })

  describe('.globalEvents', () => {
    let globalEvents

    beforeEach(() => {
      // eslint-disable-next-line prefer-destructuring
      globalEvents = require('./index.web').globalEvents
    })

    it('passes on UI task events', () => {
      const mock = jest.fn()

      globalEvents.on('testEvent', mock)

      dispatchEvent(IPC.UI_TASK, {
        task: 'testEvent',
        data: 123
      })

      expect(mock).toHaveBeenCalledWith(123)
    })

    it('rejects other events', () => {
      const mock = jest.fn()

      globalEvents.on('testEvent', mock)

      dispatchEvent('someEvent', {
        task: 'testEvent',
        data: 123
      })

      expect(mock).not.toHaveBeenCalled()
    })
  })
})
