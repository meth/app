import { createAction, createActionCreator } from './utils'

describe('.createAction()', () => {
  it('returns object', () => {
    expect(createAction('blah', { a: 1 })).toEqual({
      type: 'blah',
      payload: {
        a: 1
      }
    })
  })

  it('and without a payload key if no payload is given', () => {
    expect(createAction('blah')).toEqual({
      type: 'blah'
    })
  })
})

describe('.createActionCreator()', () => {
  describe('returns a function', () => {
    it('that creates an action from a payload', () => {
      const fn = createActionCreator('blah')

      expect(fn({ a: 1 })).toEqual({
        type: 'blah',
        payload: {
          a: 1
        }
      })
    })

    it('and handles multiple payload args as an array payload', () => {
      const fn = createActionCreator('blah')

      expect(fn(1, 2)).toEqual({
        type: 'blah',
        payload: [ 1, 2 ]
      })
    })

    it('that can have a custom payload handler', () => {
      const fn = createActionCreator('blah', (p, q) => ({ wrap: p, q }))

      expect(fn({ a: 1 }, 2)).toEqual({
        type: 'blah',
        payload: {
          wrap: {
            a: 1
          },
          q: 2
        }
      })
    })
  })
})
