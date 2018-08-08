import { Web3MethodFactory } from './index'
import generic from './generic'
/* eslint-disable camelcase */
import eth_accounts from './eth_accounts'
import eth_sendTransaction from './eth_sendTransaction'
import eth_sign from './eth_sign'
import personal_ecRecover from './personal_ecRecover'
import personal_listAccounts from './personal_listAccounts'
import personal_sendTransaction from './personal_sendTransaction'
import personal_sign from './personal_sign'
/* eslint-enable camelcase */



describe('web3 method factory', () => {
  let factory

  beforeEach(() => {
    factory = new Web3MethodFactory({})
  })

  describe('.getHandler', () => {
    it('returns generic handler', () => {
      expect(factory.getHandler('eth_blockNumber')).toBeInstanceOf(generic)
    })

    it('returns specific handlers', () => {
      expect.assertions(7)

      const handlers = {
        eth_accounts,
        eth_sendTransaction,
        eth_sign,
        personal_ecRecover,
        personal_listAccounts,
        personal_sign,
        personal_sendTransaction
      }

      Object.keys(handlers).forEach(k => {
        expect(factory.getHandler(k)).toBeInstanceOf(handlers[k])
      })
    })
  })
})
