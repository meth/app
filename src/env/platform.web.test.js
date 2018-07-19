import setup from './platform.web'

import IPC from '../../common/constants/ipc'
import BACKEND_TASKS from '../../common/constants/ipcBackendTasks'

describe('.alert()', () => {
  let consoleSpy
  let alertSpy
  let alertFn

  beforeEach(() => {
    alertSpy = jest.spyOn(window, 'alert')

    consoleSpy = jest.spyOn(console, 'error')

    alertFn = setup({ log: console }).alert
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('calls through to console', () => {
    alertFn('test')

    expect(consoleSpy).toHaveBeenCalledWith('test')
  })

  it('calls through to window.alert', () => {
    alertFn('test')

    expect(alertSpy).toHaveBeenCalledWith('test')
  })
})

describe('.openExternalUrl()', () => {
  let spy

  beforeEach(() => {
    spy = jest.spyOn(window, 'postMessage')
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('calls window.postMessage', async () => {
    const { openExternalUrl } = setup({ log: console })

    await openExternalUrl('test')

    expect(spy).toHaveBeenCalledWith(
      {
        ipc: IPC.BACKEND_TASK,
        details: {
          task: BACKEND_TASKS.OPEN_EXTERNAL_URL,
          params: { url: 'test' }
        }
      },
      '*'
    )
  })
})
