import Q from 'bluebird'
import _ from 'lodash'

import { buildAction } from '../actions'
import * as log from '../../utils/log'
import * as init from './mixins/init'
import * as nav from './mixins/nav'
import * as modals from './mixins/modals'
import * as nodes from './mixins/nodes'
import * as wallet from './mixins/wallet'

/**
 * Controller/controller
 */
class Controller {
  constructor() {
    this._log = log.create('controller')

    this._loadMixin('init', init)
    this._loadMixin('nav', nav)
    this._loadMixin('modals', modals)
    this._loadMixin('nodes', nodes)
    this._loadMixin('wallet', wallet)
  }

  setStore(store) {
    this._dispatch = store.dispatch
    this._getState = name => store.getState()[name].toObject()
  }

  _loadMixin(namespace, methods) {
    if (_.isFunction(methods)) {
      this[namespace] = Q.method(methods).bind(this)
    } else {
      this[namespace] = {}

      _.each(methods, (body, key) => {
        this[namespace][key] = Q.method(body).bind(this)
      })
    }
  }

  _action(type, payload) {
    this._dispatch(buildAction(type, payload))
  }

  _stateAction(type, state, data) {
    if (typeof state !== 'string') {
      throw new Error('State must be a string')
    }

    this._dispatch(buildAction(type, { state, data }))
  }
}

export default new Controller()
