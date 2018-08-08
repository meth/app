/* eslint-disable camelcase */
import eth_sendTransaction from './eth_sendTransaction'
import personal_sendTransaction from './personal_sendTransaction'
/* eslint-enable camelcase */

jest.mock('./personal_sendTransaction', () => {
  class PS {
    constructor (...args) {
      this.constructorArgs = args
    }
  }

  return PS
})

describe('eth_sendTransaction', () => {
  let h

  beforeEach(() => {
    h = new eth_sendTransaction('config') // eslint-disable-line new-cap
  })

  it('is instance of personal_sendTransaction', () => {
    expect(h).toBeInstanceOf(personal_sendTransaction)
    expect(h.constructorArgs).toEqual([
      'config',
      'eth_sendTransaction'
    ])
  })
})
