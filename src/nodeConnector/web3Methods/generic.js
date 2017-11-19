import logger from '../../logger'

export default class GenericMethod {
  constructor ({ nodeConnector, walletManager, store }, method) {
    this._nodeConnector = nodeConnector
    this._walletManager = walletManager
    this._store = store
    this._method = method
    this._log = logger.create(`method[${method}]`)
  }

  async run (params) {
    this._log.trace(`Call`, params)

    return this._nodeConnector.rawCall(this._method, params)
  }
}
