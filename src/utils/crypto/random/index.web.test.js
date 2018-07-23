import getRandomValues from './index.web'

jest.mock('./insecure', () => () => 'insecure')

describe('.getRandomValues', () => {
  let originalCrypto

  beforeEach(() => {
    originalCrypto = window.crypto
    window.crypto = {
      getRandomValues: jest.fn(arr => {
        for (let i = 0; arr.length > i; i += 1) {
          arr[i] = i // eslint-disable-line no-param-reassign
        }
      })
    }
  })

  afterEach(() => {
    window.crypto = originalCrypto
  })

  it('returns secure random 8-bit bytes', async () => {
    const result = await getRandomValues(16)

    expect(result).toBeInstanceOf(Array)
    expect(Array.from(result)).toEqual([ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15 ])
  })

  it('returns secure random 32-bit bytes', async () => {
    const result = await getRandomValues(16, true)

    expect(result).toBeInstanceOf(Array)
    expect(Array.from(result)).toEqual([ 0, 1, 2, 3 ])
  })

  it('uses insecure generation if secure random generation not available', async () => {
    delete window.crypto.getRandomValues

    const result = await getRandomValues(16, true)

    expect(result).toEqual('insecure')
  })
})
