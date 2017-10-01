import {
  connectNode,
  connectNodeInProgress,
  connectNodeError,
  connectNodeSuccess
} from './actionCreators'
import { NODE_IS_CONNECTING } from './actions'
import { ready, inProgress, error, success } from '../../utils/stateMachines'

describe('connectNode()', () => {
  it('returns action', () => {
    expect(connectNode(123)).toEqual({
      type: NODE_IS_CONNECTING,
      payload: {
        state: ready,
        data: 123
      }
    })
  })
})

describe('connectNodeInProgress()', () => {
  it('returns action', () => {
    expect(connectNodeInProgress(123)).toEqual({
      type: NODE_IS_CONNECTING,
      payload: {
        state: inProgress,
        data: 123
      }
    })
  })
})

describe('connectNodeError()', () => {
  it('returns action', () => {
    expect(connectNodeError(123)).toEqual({
      type: NODE_IS_CONNECTING,
      payload: {
        state: error,
        data: 123
      }
    })
  })
})

describe('connectNodeSuccess()', () => {
  it('returns action', () => {
    expect(connectNodeSuccess(123)).toEqual({
      type: NODE_IS_CONNECTING,
      payload: {
        state: success,
        data: 123
      }
    })
  })
})
