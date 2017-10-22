import Immutable from 'immutable'
import { getTx, getTxDeferred } from './selectors'

describe('getTx()', () => {
  it('returns current transaction', () => {
    const state = {
      api: new Immutable.Map({
        currentTx: 123
      })
    }

    expect(getTx(state)).toEqual(123)
  })
})

describe('getTxDeferred()', () => {
  it('returns current transaction deferred object', () => {
    const state = {
      api: new Immutable.Map({
        currentTxDeferred: 123
      })
    }

    expect(getTxDeferred(state)).toEqual(123)
  })
})
