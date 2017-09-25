import { reset, push } from './actionCreators'
import { PUSH, RESET } from './actions'

describe('push()', () => {
  it('with path name returns action', () => {
    expect(push('test')).toEqual({
      type: PUSH,
      payload: {
        path: 'test',
        params: {}
      }
    })
  })

  it('with path name and params returns action', () => {
    expect(push('test', { dummy: false })).toEqual({
      type: PUSH,
      payload: {
        path: 'test',
        params: { dummy: false }
      }
    })
  })
})

describe('reset()', () => {
  it('with path name returns action', () => {
    expect(reset('test')).toEqual({
      type: RESET,
      payload: {
        path: 'test',
        params: {}
      }
    })
  })

  it('with path name and params returns action', () => {
    expect(reset('test', { dummy: false })).toEqual({
      type: RESET,
      payload: {
        path: 'test',
        params: { dummy: false }
      }
    })
  })
})
