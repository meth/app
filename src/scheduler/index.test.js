import scheduler from './'

jest.mock('../utils/deviceInfo', () => require('method-mocks').setupMethodMocks({
  isMobile: () => false
}))

jest.mock('../env', () => ({ globalEvents: new (require('eventemitter3'))() }))

describe('scheduler', () => {
  afterEach(() => {
    scheduler.stop()
    scheduler._jobs = {} // clear out all jobs
  })

  it('can run job every X seconds', async () => {
    const spy = jest.fn()

    scheduler.addJob('test', 2, spy)

    expect(spy).toHaveBeenCalledTimes(1)

    await sleepAsync(1000)
    expect(spy).toHaveBeenCalledTimes(1)

    await sleepAsync(1001)
    expect(spy).toHaveBeenCalledTimes(2)
  })

  it('can remove a job', async () => {
    const spy = jest.fn()

    const id = scheduler.addJob('test', 2, spy)

    expect(spy).toHaveBeenCalledTimes(1)

    scheduler.removeJob(id)

    await sleepAsync(2001)
    expect(spy).toHaveBeenCalledTimes(1)
  })

  it('can be started and stopped', async () => {
    const spy = jest.fn()

    scheduler.addJob('test', 2, spy)
    expect(spy).toHaveBeenCalledTimes(1)

    scheduler.stop()

    await sleepAsync(2001)
    expect(spy).toHaveBeenCalledTimes(1)

    scheduler.start()

    await sleepAsync(2001)
    expect(spy).toHaveBeenCalledTimes(2)
  })
})
