import { mutable } from './utils'

describe('.mutable', () => {
  it('returns non-immutables as is', () => {
    const input = {
      a: 1,
      b: '2',
      c: false,
      d: {
        e: jest.fn()
      }
    }

    expect(mutable(input)).toEqual(input)
  })

  it('returns immutables as mutables', () => {
    const input = {
      a: 1,
      b: {
        toObject: () => 23
      }
    }

    expect(mutable(input)).toEqual({
      a: 1,
      b: 23
    })
  })

  it('can return a subset', () => {
    const input = {
      a: 1,
      b: {
        toObject: () => 23
      },
      c: 3
    }

    expect(mutable(input, 'a', 'c')).toEqual({
      a: 1,
      c: 3
    })
  })
})
