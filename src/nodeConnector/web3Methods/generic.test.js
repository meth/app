import Generic from './generic'

describe('generic method', () => {
  let methodHandler
  let nodeConnector

  beforeEach(() => {
    nodeConnector = {
      rawCall: jest.fn()
    }

    methodHandler = new Generic({
      nodeConnector,
      walletManager: 'wm',
      store: 'st'
    }, 'blah')
  })

  it('.constructor', () => {
    expect(methodHandler._nodeConnector).toEqual(nodeConnector)
    expect(methodHandler._walletManager).toEqual('wm')
    expect(methodHandler._store).toEqual('st')
    expect(methodHandler._method).toEqual('blah')
  })

  describe('.run', () => {
    it('raw calls the method', async () => {
      await methodHandler.run(123)

      expect(nodeConnector.rawCall).toHaveBeenCalledWith('blah', 123)
    })
  })
})
