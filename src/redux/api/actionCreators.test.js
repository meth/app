import API from '../../../common/constants/api'
import * as methods from './actionCreators'
import { WEB3_REQUEST, GENERATE_ADDRESS, SEND_TX, CANCEL_TX } from './actions'

const { web3Request, generateAddress, sendTransaction, cancelTransaction } = methods

describe('web3Request()', () => {
  it('with payload returns action', () => {
    expect(web3Request({
      method: 'getAccounts'
    })).toEqual({
      type: WEB3_REQUEST,
      payload: {
        method: 'getAccounts'
      }
    })
  })
})

describe('generateAddress()', () => {
  it('with payload returns action', () => {
    expect(generateAddress(123)).toEqual({
      type: GENERATE_ADDRESS,
      payload: 123
    })
  })
})

describe('sendTransaction()', () => {
  it('returns action', () => {
    expect(sendTransaction(123)).toEqual({
      type: SEND_TX,
      payload: {
        tx: 123
      }
    })
  })
})

describe('cancelTransaction()', () => {
  it('returns action', () => {
    expect(cancelTransaction(123)).toEqual({
      type: CANCEL_TX,
      payload: 123
    })
  })
})

describe('API.GENERATE_ADDRESS()', () => {
  it('defined', () => {
    expect(cancelTransaction(123)).toEqual({
      type: CANCEL_TX,
      payload: 123
    })
  })
})

describe('API', () => {
  it('has exports', () => {
    expect.assertions(3)

    Object.keys(API).forEach(key => {
      expect(methods[key]).toBeInstanceOf(Function)
    })
  })
})
