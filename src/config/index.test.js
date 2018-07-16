import { getBackendUrl, getAppName, getAppVersion } from './'

jest.mock('../../buildConfig.json', () => ({
  appName: 'test1',
  backend: 'https://test1.com',
  appVersion: '2.1.2'
}))

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
