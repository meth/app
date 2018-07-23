import getRandomValues from './insecure'

describe('.getRandomValues', () => {
  it('returns random 8-bit values', () => {
    const result = getRandomValues(16)

    expect(result).toBeInstanceOf(Array)
    expect(result.length).toEqual(16)
  })

  it('returns random 32-bit values', () => {
    const result = getRandomValues(16, true)

    expect(result).toBeInstanceOf(Array)
    expect(result.length).toEqual(4)
  })
})
