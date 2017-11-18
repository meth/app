import Immutable from 'immutable'
import { getAddresses, getBookMarks, getDappPermissions } from './selectors'

describe('.getAddresses()', () => {
  it('returns addresses', () => {
    const state = {
      account: new Immutable.Map({
        addressNames: {
          a: 'ram',
          b: 'jeff'
        },
        addressBalances: {
          a: 1,
          b: 2
        }
      })
    }

    expect(getAddresses(state)).toEqual({
      a: {
        balance: 1,
        name: 'ram'
      },
      b: {
        balance: 2,
        name: 'jeff'
      }
    })
  })
})

describe('.getBookMarks()', () => {
  it('returns bookmarks', () => {
    const state = {
      account: new Immutable.Map({
        bookmarks: {
          a: 'ram',
          b: 'jeff'
        }
      })
    }

    expect(getBookMarks(state)).toEqual({
      a: 'ram',
      b: 'jeff'
    })
  })

  it('returns empty list as fallback', () => {
    const state = {
      account: new Immutable.Map({})
    }

    expect(getBookMarks(state)).toEqual([])
  })
})

describe('.getDappPermissions()', () => {
  it('returns dapp permission', () => {
    const state = {
      account: new Immutable.Map({
        dappPermissions: {
          a: 'ram',
          b: 'jeff'
        }
      })
    }

    expect(getDappPermissions(state)).toEqual({
      a: 'ram',
      b: 'jeff'
    })
  })

  it('returns empty object as fallback', () => {
    const state = {
      account: new Immutable.Map({})
    }

    expect(getDappPermissions(state)).toEqual({})
  })
})
