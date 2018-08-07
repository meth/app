import AppSettings from './appSettings'

jest.mock('./database', () => require('./__mocks__/database'))


describe('AppSettings', () => {
  let d
  let store

  beforeEach(() => {
    store = {
      actions: {
        injectAppSettings: 123
      }
    }

    d = new AppSettings(store, 'net', 'auth', 'enc')
  })

  it('.constructor', () => {
    expect(d.constructorArgs).toEqual([
      'appSettings',
      {
        storeInject: 123,
        authKey: 'auth',
        encryptionKey: 'enc'
      }
    ])
  })

  it('.addOrUpdate', async () => {
    d._addOrUpdate = jest.fn()
    d._generateId = jest.fn(() => 123)

    const doc = { name: 'addr' }

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
