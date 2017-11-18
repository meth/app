import Immutable from 'immutable'

import reducer from './reducer'
import { ADDRESS_BALANCES, ADDRESS_NAMES, BOOKMARKS, DAPP_PERMISSIONS } from './actions'

describe('ADDRESS_BALANCES', () => {
  it('updates the balances', () => {
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
  it('updates the names', () => {
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
  it('updates the bookmarks', () => {
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
  it('updates the bookmarks', () => {
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
