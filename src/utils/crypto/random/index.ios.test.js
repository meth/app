import SecureRandom from 'react-native-securerandom'

import getRandomValues from './index.ios'

jest.mock('react-native-securerandom', () => require('method-mocks').setupMethodMocks())
jest.mock('./insecure', () => () => 'insecure')

const BYTES = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16 ]

describe('.getRandomValues', () => {
  afterEach(() => {
    SecureRandom.clearAllMethodMocks()
  })

  it('returns secure random 8-bit bytes', async () => {
    const spy = SecureRandom.setMethodMock('generateSecureRandom', jest.fn(() => Promise.resolve(BYTES)))

    const result = await getRandomValues(16)

    expect(result).toBeInstanceOf(Array)
    expect(result).toEqual(BYTES)
    expect(spy).toHaveBeenCalledWith(16)
  })

  it('returns secure random 32-bit bytes', async () => {
    const spy = SecureRandom.setMethodMock('generateSecureRandom', jest.fn(() => Promise.resolve(BYTES)))

    const result = await getRandomValues(16, true)

    expect(result).toBeInstanceOf(Array)
    expect(result).toEqual([ 33818116, 168562184, 303306252, 438050320 ])
    expect(spy).toHaveBeenCalledWith(16)
  })

  it('returns insecure if secure random random generation fails', async () => {
    const spy = SecureRandom.setMethodMock('generateSecureRandom', jest.fn(() => Promise.reject(new Error('test'))))

    const result = await getRandomValues(16)

    expect(result).toEqual('insecure')
    expect(spy).toHaveBeenCalledWith(16)
  })
})
