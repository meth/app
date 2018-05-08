import Database from './database'

export default class CustomTokens extends Database {
  constructor (store, authKey, encryptionKey) {
    super('customTokens', {
      storeInject: store.actions.injectCustomTokens,
      authKey,
      encryptionKey
    })
  }

  async addOrUpdate (doc) {
    const { symbol } = doc

    return this._addOrUpdate(this._generateId(symbol), doc)
  }

  async remove (symbol) {
    return this._remove(this._generateId(symbol))
  }
}
