import Immutable from 'immutable'

import reducer from './reducer'
import {
  ADDRESS_BALANCES,
  ADDRESS_NAMES,
  BOOKMARKS,
  DAPP_PERMISSIONS,
  SAVE_DAPP_PERMISSIONS
} from './actions'

describe('ADDRESS_BALANCES', () => {
  it('sets up balances', () => {
    const state = Immutable.Map({})

    const reduce = reducer()

    const newState = reduce(state, {
      type: ADDRESS_BALANCES,
      payload: {
        dummy: false
      }
    })

    expect(newState.get('addressBalances')).toEqual({
      dummy: false
    })
  })
})

describe('ADDRESS_NAMES', () => {
  it('sets up names', () => {
    const state = Immutable.Map({})

    const reduce = reducer()

    const newState = reduce(state, {
      type: ADDRESS_NAMES,
      payload: {
        dummy: false
      }
    })

    expect(newState.get('addressNames')).toEqual({
      dummy: false
    })
  })

  it('unless payload is empty', () => {
    const state = Immutable.Map({})

    const reduce = reducer()

    const newState = reduce(state, {
      type: ADDRESS_NAMES
    })

    expect(newState.get('addressNames')).toEqual(undefined)
  })
})

describe('BOOKMARKS', () => {
  it('sets up bookmarks', () => {
    const state = Immutable.Map({})

    const reduce = reducer()

    const newState = reduce(state, {
      type: BOOKMARKS,
      payload: {
        dummy: false
      }
    })

    expect(newState.get('bookmarks')).toEqual({
      dummy: false
    })
  })
})

describe('DAPP_PERMISSIONS', () => {
  it('sets up permissions', () => {
    const state = Immutable.Map({})

    const reduce = reducer()

    const newState = reduce(state, {
      type: DAPP_PERMISSIONS,
      payload: {
        dummy: false
      }
    })

    expect(newState.get('dappPermissions')).toEqual({
      dummy: false
    })
  })
})

describe('SAVE_DAPP_PERMISSIONS', () => {
  it('saves permissions for given dapp', () => {
    const state = Immutable.Map({
      dappPermissions: {
        test: {
          hello: 'jim'
        },
        test2: {
          hello: 'bob'
        }
      }
    })

    const reduce = reducer()

    const newState = reduce(state, {
      type: SAVE_DAPP_PERMISSIONS,
      payload: {
        dappId: 'test2',
        permissions: { hello: 'mark' }
      }
    })

    expect(newState.get('dappPermissions')).toEqual({
      test: {
        hello: 'jim'
      },
      test2: {
        hello: 'mark'
      }
    })
  })
})
