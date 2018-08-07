import Transactions from './transactions'

jest.mock('./database', () => require('./__mocks__/database'))


describe('Transactions', () => {
  let d
  let store

  beforeEach(() => {
    store = {
      actions: {
        injectTransactionHistory: 123
      }
    }

    d = new Transactions(store, 'net', 'auth', 'enc')
  })

  it('.constructor', () => {
    expect(d.constructorArgs).toEqual([
      'transactions',
      {
        storeInject: 123,
        authKey: 'auth-net',
        encryptionKey: 'enc'
      }
    ])
  })

  it('.addOrUpdate', async () => {
    d._addOrUpdate = jest.fn()
    d._generateId = jest.fn(() => 123)

    const doc = { id: 'addr' }

    await d.addOrUpdate(doc)

    expect(d._generateId).toHaveBeenCalledWith('addr')
    expect(d._addOrUpdate).toHaveBeenCalledWith(123, doc)
  })

  it('.remove', async () => {
    d._remove = jest.fn()
    d._generateId = jest.fn(() => 123)

    await d.remove('addr')

    expect(d._generateId).toHaveBeenCalledWith('addr')
    expect(d._remove).toHaveBeenCalledWith(123)
  })
})
