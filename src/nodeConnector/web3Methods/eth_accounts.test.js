/* eslint-disable camelcase */
import eth_accounts from './eth_accounts'
import personal_listAccounts from './personal_listAccounts'
/* eslint-enable camelcase */

jest.mock('./personal_listAccounts', () => {
  class PS {
    constructor (...args) {
      this.constructorArgs = args
    }
  }

  return PS
})

describe('eth_accounts', () => {
  let h

  beforeEach(() => {
    h = new eth_accounts('config') // eslint-disable-line new-cap
  })

  it('is instance of personal_listAccounts', () => {
    expect(h).toBeInstanceOf(personal_listAccounts)
    expect(h.constructorArgs).toEqual([
      'config',
      'eth_accounts'
    ])
  })
})
