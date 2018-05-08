import Database from './database'

export default class Transactions extends Database {
  constructor (store, authKey, encryptionKey) {
    super('transactions', {
      storeInject: store.actions.injectTransactionHistory,
      authKey,
      encryptionKey
    })
  }

  async addOrUpdate (doc) {
    const { id } = doc

    return this._addOrUpdate(this._generateId(id), doc)
  }

  async remove (txId) {
    return this._remove(this._generateId(txId))
  }
}
