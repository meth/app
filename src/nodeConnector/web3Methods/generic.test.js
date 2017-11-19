import Generic from './generic'

jest.mock('../../logger', () => ({
  create: tag => ({ logger: tag })
}))


describe('generic method', () => {
  const nodeConnector = {}
  const walletManager = {}
  const store = {}

  it('stores config instances', () => {
    const generic = new Generic({ nodeConnector, walletManager, store }, 'blah')

    expect(generic._nodeConnector).toEqual(nodeConnector)
    expect(generic._walletManager).toEqual(walletManager)
    expect(generic._store).toEqual(store)
  })

  it('sets up logging', () => {
    const generic = new Generic({ nodeConnector, walletManager, store }, 'blah')

    expect(generic._log).toEqual({ logger: 'method[blah]' })
  })
})
