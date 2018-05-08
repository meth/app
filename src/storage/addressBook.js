import Database from './database'

export default class AddressBook extends Database {
  constructor (store, authKey, encryptionKey) {
    super('addressBook', {
      storeInject: store.actions.injectAddressBook,
      authKey,
      encryptionKey
    })
  }

  async addOrUpdate (doc) {
    const { address } = doc

    return this._addOrUpdate(this._generateId(address), doc)
  }

  async remove (address) {
    return this._remove(this._generateId(address))
  }
}
