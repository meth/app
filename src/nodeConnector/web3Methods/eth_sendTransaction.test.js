import Generic from './generic'
import Method from './eth_sendTransaction'

describe('eth_sendTransaction', () => {
  let store

  beforeEach(() => {
    const sendTransaction = jest.fn(() => Promise.resolve(123))

    store = { actions: { sendTransaction } }
  })

  it('extends Generic', () => {
    const ret = new Method({})

    expect(ret).toBeInstanceOf(Generic)
  })

  it('calls method to send transaction', async () => {
    const ret = new Method({})
    ret._store = store

    expect(await ret.run([ {
      from: '0x',
      data: '0x'
    } ])).toEqual(123)
  })

  it('and checks that from is set', async () => {
    const ret = new Method({})
    ret._store = store

    try {
      await ret.run([ {} ])
    } catch (err) {
      expect(err.toString()).toContain('"from" must be set')
    }
  })

  it('and checks that to or data is set', async () => {
    const ret = new Method({})
    ret._store = store

    try {
      await ret.run([ { from: '0x' } ])
    } catch (err) {
      expect(err.toString()).toContain('Either "to" or "data" must be set')
    }
  })
})
