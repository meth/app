import reducer from './reducer'
import { PUSH, RESET, BACK } from './actions'

describe('initial state', () => {
  it('gets set using router', () => {
    const router = {
      getStateForAction: jest.fn(action => ({
        index: 1,
        state: [ action ]
      })),
      getActionForPathAndParams: jest.fn((path, params) => ({
        type: 'MOCK_NAV',
        payload: {
          path,
          params
        }
      }))
    }

    const reduce = reducer({ router })

    expect(reduce(undefined, { type: 'invalid' })).toEqual({
      index: 1,
      state: [
        {
          type: 'MOCK_NAV',
          payload: { path: '', params: undefined }
        }
      ]
    })
  })
})

describe('when a navigation action is received', () => {
  let router

  beforeEach(() => {
    router = {
      getStateForAction: jest.fn((action, state = []) => ({
        index: 1,
        state: [ ...state, action ]
      })),
      getActionForPathAndParams: jest.fn((path, params) => ({
        type: 'MOCK_NAV',
        payload: {
          path,
          params
        }
      }))
    }
  })

  it('a PUSH action pushes a new path onto the state stack', () => {
    const reduce = reducer({ router })

    const state = [ 'dummy' ]

    const payload = {
      path: '/',
      params: {
        hello: 'world'
      }
    }

    expect(reduce(state, { type: PUSH, payload })).toEqual({
      index: 1,
      state: [ 'dummy', { type: 'MOCK_NAV', payload } ]
    })
  })

  it('a RESET action resets the state stack', () => {
    const reduce = reducer({ router })

    const state = [ 'dummy' ]

    const payload = {
      path: '/',
      params: {
        hello: 'world'
      }
    }

    expect(reduce(state, { type: RESET, payload })).toEqual({
      index: 1,
      state: [ { type: 'MOCK_NAV', payload } ]
    })
  })

  it('a BACK action pops the state stack', () => {
    const reduce = reducer({ router })

    const state = [ 'dummy' ]

    expect(reduce(state, { type: BACK })).toEqual({
      index: 1,
      state: [ 'dummy', { type: BACK } ]
    })
  })
})
