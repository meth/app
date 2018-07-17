import { Alert, Linking } from 'react-native'

import setup from './platform.ios'

jest.mock('react-native', () => {
  const { setupMethodMocks } = require('method-mocks')

  return {
    Alert: setupMethodMocks({}),
    Linking: setupMethodMocks({})
  }
})

describe('.alert()', () => {
  let mock

  beforeEach(() => {
    mock = jest.fn()

    Alert.setMethodMock('alert', mock)
  })

  afterEach(() => {
    Alert.clearAllMethodMocks()
  })

  it('calls through to native method', () => {
    const { alert } = setup({ log: console })

    alert('test')

    expect(mock).toHaveBeenCalledWith('test')
  })
})

describe('.openExternalUrl()', () => {
  afterEach(() => {
    Linking.clearAllMethodMocks()
  })

  it('does nothing if cannot open URL', async () => {
    const spy = jest.fn()

    Linking.setMethodMock('canOpenURL', () => Promise.resolve(false))
    Linking.setMethodMock('openURL', spy)

    const { openExternalUrl } = setup({ log: console })

    await openExternalUrl('test')

    expect(spy).not.toHaveBeenCalled()
  })

  it('opens URL if it can open URL', async () => {
    const spy = jest.fn()

    Linking.setMethodMock('canOpenURL', () => Promise.resolve(true))
    Linking.setMethodMock('openURL', spy)

    const { openExternalUrl } = setup({ log: console })

    await openExternalUrl('test')

    expect(spy).toHaveBeenCalledWith('test')
  })
})
