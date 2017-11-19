import Generic from './generic'
import Method from './eth_accounts'

describe('eth_accounts', () => {
  it('extends Generic', () => {
    const ret = new Method({})

    expect(ret).toBeInstanceOf(Generic)
  })

  it('gets a list of addresses from the wallet', async () => {
    const ret = new Method({})

    const getAddresses = jest.fn(() => Promise.resolve(123))

    ret._walletManager = {
      wallet: () => ({
        getAddresses
      })
    }

    expect(await ret.run()).toEqual(123)
  })
})
