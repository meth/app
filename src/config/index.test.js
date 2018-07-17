import { getBackendUrl, getAppName, getAppVersion, load } from './'
import networks from './networks.json'

jest.mock('../../buildConfig.json', () => ({
  appName: 'test1',
  backend: 'https://test1.com',
  appVersion: '2.1.2'
}))

jest.mock('../utils/fetch', () => {
  let count = 0

  return {
    loadJSON: fn => {
      if (fn.includes('networks') || fn.includes('fail')) {
        return Promise.reject(Error('failure'))
      }

      count += 1

      return Promise.resolve({
        file: fn,
        count
      })
    }
  }
})

describe('.getBackendUrl()', () => {
  it('returns correct value', () => {
    expect(getBackendUrl()).toEqual('https://test1.com')
  })
})

describe('.getAppName()', () => {
  it('returns correct value', () => {
    expect(getAppName()).toEqual('test1')
  })
})

describe('.getAppVersion()', () => {
  it('returns correct value', () => {
    expect(getAppVersion()).toEqual('2.1.2')
  })
})

describe('.load()', () => {
  it('tries to load from remote', async () => {
    expect(load('test')).resolves.toEqual({
      file:
        'https://raw.githubusercontent.com/meth-project/meth-browser/master/src/config/test.json',
      count: 1
    })
  })

  it('loads from cached version the second time round even if remote available', async () => {
    expect(load('test')).resolves.toEqual({
      file:
        'https://raw.githubusercontent.com/meth-project/meth-browser/master/src/config/test.json',
      count: 1
    })
  })

  it('reloads from remote if explicitly told to skip cached version', async () => {
    expect(load('test', true)).resolves.toEqual({
      file:
        'https://raw.githubusercontent.com/meth-project/meth-browser/master/src/config/test.json',
      count: 2
    })
  })

  it('returns bundled version if remote not found', async () => {
    expect(load('networks')).resolves.toEqual(networks)
  })

  it('fails completely if both remote and bundled mode not found', async () => {
    expect(load('fail')).rejects.toEqual(Error)
  })
})
