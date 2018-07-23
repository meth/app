import {
  CorruptDataError,
  UnableToConnectError,
  RequestTimeoutError,
  instanceOfError
} from './errors'

import { loadJSON } from './fetch'

describe('.loadJSON()', () => {
  let originalFetch
  let fetchHandler

  beforeEach(() => {
    originalFetch = global.fetch
    global.fetch = jest.fn(() => fetchHandler())
  })

  afterEach(() => {
    global.fetch = originalFetch
  })

  it('loads from remote', async () => {
    fetchHandler = () => Promise.resolve({
      json: () => Promise.resolve({ success: true })
    })

    const result = await loadJSON('http://google.com', 'GET', { a: 1 }, { b: 2 }, { c: 3 })

    expect(result).toEqual({
      success: true
    })

    expect(global.fetch).toHaveBeenCalledWith('http://google.com?a=1', {
      cache: 'no-cache',
      method: 'GET',
      headers: {
        c: 3,
        'Content-Type': 'application/json'
      }
    })
  })

  it('can POST to remote', async () => {
    fetchHandler = () => Promise.resolve({
      json: () => Promise.resolve({ success: true })
    })

    const result = await loadJSON('http://google.com', 'POST', { a: 1 }, { b: 2 }, { c: 3 })

    expect(result).toEqual({
      success: true
    })

    expect(global.fetch).toHaveBeenCalledWith('http://google.com?a=1', {
      cache: 'no-cache',
      method: 'POST',
      body: JSON.stringify({ b: 2 }),
      headers: {
        c: 3,
        'Content-Type': 'application/json'
      }
    })
  })

  it('can handle timeouts', async () => {
    fetchHandler = () => sleepAsync(2000)

    try {
      await loadJSON('http://google.com', 'GET', {}, {}, {}, 1000)
    } catch (err) {
      expect(instanceOfError(err, RequestTimeoutError)).toEqual(true)
    }
  })

  it('can handle fetch failures', async () => {
    fetchHandler = () => Promise.reject(new Error('failed to fetch'))

    try {
      await loadJSON('http://google.com')
    } catch (err) {
      expect(instanceOfError(err, UnableToConnectError)).toEqual(true)
    }

    fetchHandler = () => Promise.reject(new Error('network request failed'))

    try {
      await loadJSON('http://google.com')
    } catch (err) {
      expect(instanceOfError(err, UnableToConnectError)).toEqual(true)
    }
  })

  it('can handle result parsing failures', async () => {
    fetchHandler = () => Promise.resolve({
      json: () => Promise.reject(new Error('fail'))
    })

    try {
      await loadJSON('http://google.com')
    } catch (err) {
      expect(instanceOfError(err, CorruptDataError)).toEqual(true)
    }
  })
})
