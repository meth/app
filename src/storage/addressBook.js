import Database from './database'

export default class AddressBook extends Database {
  constructor (authKey, encryptionKey) {
    super('addressBook', authKey, encryptionKey)
  }

  async addOrUpdate (doc) {
    const { address } = doc

    return this._addOrUpdate(this._generateId(address), doc)
  }

  async remove (doc) {
    const { address } = doc

    return this._remove(this._generateId(address))
  }
}
