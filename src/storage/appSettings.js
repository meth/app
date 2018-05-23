import Database from './database'

export default class AppSettings extends Database {
  constructor (store, _, authKey, encryptionKey) {
    super('appSettings', {
      storeInject: store.actions.injectUserAppSettings,
      authKey,
      encryptionKey
    })
  }

  // each setting is stored as an object with a key "name" identifying the setting
  async addOrUpdate (setting) {
    const { name } = setting

    return this._addOrUpdate(this._generateId(name), setting)
  }

  async remove (name) {
    return this._remove(this._generateId(name))
  }
}
