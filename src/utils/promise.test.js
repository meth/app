import { waitUntil } from './promise'

describe('.waitUntil()', () => {
  it('waits until callback returns value', async () => {
    let val = 1

    const spy = jest.fn(() => val)

    setTimeout(() => {
      val = 123
    }, 2000)

    const result = await waitUntil(spy, 123, 10000)

    expect(result).toBe(true)

    expect(spy.mock.calls.length).toBeGreaterThan(10)
  })

  it('can time out', async () => {
    let val = 1

    const spy = jest.fn(() => val)

    setTimeout(() => {
      val = 123
    }, 2000)

    const result = await waitUntil(spy, 123, 500 /* times out in 0.5 seconds */)

    expect(result).toBe(false)
  })
})
