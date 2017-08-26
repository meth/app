const MAPPING = {
  eth_accounts: require('./eth_accounts').default,
  generic: require('./generic').default
}


export class Web3MethodFactory {
  constructor (nodeConnector) {
    this._connector = nodeConnector
    this._handlers = {}
  }

  getHandler (method) {
    if (!this._handlers[method]) {
      const Klass = MAPPING[method] || MAPPING.generic

      this._handlers[method] = new Klass(this._connector, method)
    }

    return this._handlers[method]
  }
}
