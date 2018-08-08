/* eslint-disable camelcase */
import eth_sign from './eth_sign'
import personal_sign from './personal_sign'
/* eslint-enable camelcase */

jest.mock('./personal_sign', () => {
  class PS {
    constructor (...args) {
      this.constructorArgs = args
    }
    run (...args) {
      this.runArgs = args
    }
  }

  return PS
})

describe('eth_sign', () => {
  let h

  beforeEach(() => {
    h = new eth_sign('config') // eslint-disable-line new-cap
  })

  it('is instance of personal_sign', () => {
    expect(h).toBeInstanceOf(personal_sign)
    expect(h.constructorArgs).toEqual([
      'config',
      'eth_sign'
    ])
  })

  it('reverses the params before calling super()', async () => {
    await h.run([ 1, 2, 3 ])

    expect(h.runArgs).toEqual([ [ 3, 2, 1 ] ])
  })
})
