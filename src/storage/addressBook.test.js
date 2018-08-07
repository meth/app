import AddressBook from './addressBook'

jest.mock('./database', () => require('./__mocks__/database'))

describe('AddressBook', () => {
  let d
  let store

  beforeEach(() => {
    store = {
      actions: {
        injectAddressBook: 123
      }
    }

    d = new AddressBook(store, 'net', 'auth', 'enc')
  })

  it('.constructor', () => {
    expect(d.constructorArgs).toEqual([
      'addressBook',
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

    const doc = { address: 'addr' }

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
