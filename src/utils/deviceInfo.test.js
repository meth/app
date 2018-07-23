describe('web', () => {
  let deviceInfo

  beforeEach(() => {
    jest.resetModules()
    jest.doMock('react-native', () => ({
      Platform: {
        OS: 'web'
      },
      Dimensions: {
        get: () => 812
      }
    }))

    deviceInfo = require('./deviceInfo')
  })

  afterEach(() => {
    jest.dontMock('react-native')
  })

  it('returns correct values', () => {
    expect(deviceInfo.isWeb()).toEqual(true)
    expect(deviceInfo.isAndroid()).toEqual(false)
    expect(deviceInfo.isIos()).toEqual(false)
    expect(deviceInfo.isMobile()).toEqual(false)
    expect(deviceInfo.isIphoneX()).toEqual(false)
    expect(deviceInfo.getOsName()).toEqual('unknown')
  })
})


describe('android', () => {
  let deviceInfo

  beforeEach(() => {
    jest.resetModules()
    jest.doMock('react-native', () => ({
      Platform: {
        OS: 'android'
      },
      Dimensions: {
        get: () => 812
      }
    }))

    deviceInfo = require('./deviceInfo')
  })

  afterEach(() => {
    jest.dontMock('react-native')
  })

  it('returns correct values', () => {
    expect(deviceInfo.isWeb()).toEqual(false)
    expect(deviceInfo.isAndroid()).toEqual(true)
    expect(deviceInfo.isIos()).toEqual(false)
    expect(deviceInfo.isMobile()).toEqual(true)
    expect(deviceInfo.isIphoneX()).toEqual(false)
    expect(deviceInfo.getOsName()).toEqual('android')
  })
})


describe('ios (not iphonex)', () => {
  let deviceInfo

  beforeEach(() => {
    jest.resetModules()
    jest.doMock('react-native', () => ({
      Platform: {
        OS: 'ios'
      },
      Dimensions: {
        get: () => 813
      }
    }))

    deviceInfo = require('./deviceInfo')
  })

  afterEach(() => {
    jest.dontMock('react-native')
  })

  it('returns correct values', () => {
    expect(deviceInfo.isWeb()).toEqual(false)
    expect(deviceInfo.isAndroid()).toEqual(false)
    expect(deviceInfo.isIos()).toEqual(true)
    expect(deviceInfo.isMobile()).toEqual(true)
    expect(deviceInfo.isIphoneX()).toEqual(false)
    expect(deviceInfo.getOsName()).toEqual('ios')
  })
})


describe('ios (+ iphonex)', () => {
  let deviceInfo

  beforeEach(() => {
    jest.resetModules()
    jest.doMock('react-native', () => ({
      Platform: {
        OS: 'ios'
      },
      Dimensions: {
        get: () => 812
      }
    }))

    deviceInfo = require('./deviceInfo')
  })

  afterEach(() => {
    jest.dontMock('react-native')
  })

  it('returns correct values', () => {
    expect(deviceInfo.isWeb()).toEqual(false)
    expect(deviceInfo.isAndroid()).toEqual(false)
    expect(deviceInfo.isIos()).toEqual(true)
    expect(deviceInfo.isMobile()).toEqual(true)
    expect(deviceInfo.isIphoneX()).toEqual(false)
    expect(deviceInfo.getOsName()).toEqual('ios')
  })
})
