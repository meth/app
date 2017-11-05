import { navReset, navPush, navBack } from './actionCreators'
import { PUSH, RESET, BACK } from './actions'

describe('navPush()', () => {
  it('with path name returns action', () => {
    expect(navPush('test')).toEqual({
      type: PUSH,
      payload: {
        path: 'test',
        params: {}
      }
    })
  })

  it('with path name and params returns action', () => {
    expect(navPush('test', { dummy: false })).toEqual({
      type: PUSH,
      payload: {
        path: 'test',
        params: { dummy: false }
      }
    })
  })
})

describe('navReset()', () => {
  it('with path name returns action', () => {
    expect(navReset('test')).toEqual({
      type: RESET,
      payload: {
        path: 'test',
        params: {}
      }
    })
  })

  it('with path name and params returns action', () => {
    expect(navReset('test', { dummy: false })).toEqual({
      type: RESET,
      payload: {
        path: 'test',
        params: { dummy: false }
      }
    })
  })
})

describe('navBack()', () => {
  it('returns action', () => {
    expect(navBack()).toEqual({
      type: BACK
    })
  })
})
