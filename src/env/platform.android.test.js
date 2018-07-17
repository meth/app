import { setupPlatformEnv } from './platform.android'
import { setupPlatformEnvIos } from './platform.ios'

describe('.setupPlatformEnv()', () => {
  it('is same as for ios', () => {
    expect(setupPlatformEnv).toBe(setupPlatformEnvIos)
  })
})
