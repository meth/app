import Database from './database'

export default class Bookmarks extends Database {
  constructor (store, _, authKey, encryptionKey) {
    super('bookmarks', {
      storeInject: store.actions.injectBookmarks,
      authKey,
      encryptionKey
    })
  }

  // each setting is stored as an object with a key "name" identifying the setting
  async addOrUpdate (bookmark) {
    const { url } = bookmark

    return this._addOrUpdate(this._generateId(url), bookmark)
  }

  async remove (url) {
    return this._remove(this._generateId(url))
  }
}
