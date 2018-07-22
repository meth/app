import scheduler from './'
import { globalEvents } from '../env'
import UI_TASKS from '../../common/constants/ipcUiTasks'

jest.mock('../utils/deviceInfo', () => require('method-mocks').setupMethodMocks({
  isMobile: () => true
}))

jest.mock('../env', () => ({ globalEvents: new (require('eventemitter3'))() }))

describe('scheduler', () => {
  afterEach(() => {
    scheduler.stop()
    scheduler._jobs = {} // clear out all jobs
  })

  it('gets started and stopped automatically on mobile', async () => {
    const spy = jest.fn()

    scheduler.addJob('test', 2, spy)
    expect(spy).toHaveBeenCalledTimes(1)

    globalEvents.emit(UI_TASKS.APP_INACTIVE)

    await sleepAsync(2001)
    expect(spy).toHaveBeenCalledTimes(1)

    globalEvents.emit(UI_TASKS.APP_ACTIVE)

    await sleepAsync(2001)
    expect(spy).toHaveBeenCalledTimes(2)
  })
})
