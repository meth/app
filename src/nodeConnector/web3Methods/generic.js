import logger from '../../utils/log'

const log = logger.create('web3Method')

export default class GenericMethod {
  constructor(nodeConnector, method) {
    this._connector = nodeConnector
    this._method = method
    this._log = log.create(method)
  }

  async run(params) {
    this._log.trace(`Call`, params)

    return this._connector.rawCall(this._method, params)
  }
}
