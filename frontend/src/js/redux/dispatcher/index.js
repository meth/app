import _ from 'lodash'
import { buildAction } from '../actions'
import log from '../../utils/log'


/**
 * Action dispatcher base
 */
class Dispatcher {
  constructor () {
    this._log = log.create('dispatcher')

    this._loadMixin('init', require('./mixins/init'))
    this._loadMixin('nav', require('./mixins/nav'))
    this._loadMixin('modals', require('./mixins/modals'))
    this._loadMixin('nodes', require('./mixins/nodes'))
  }

  setStore (store) {
    this._dispatch = store.dispatch
    this._getState = (name) => store.getState()[name].toObject()
  }

  _loadMixin (namespace, methods) {
    if (_.isFunction(methods)) {
      this[namespace] = methods.bind(this)
    } else {
      this[namespace] = {}

      _.each(methods, (body, key) => {
        this[namespace][key] = body.bind(this)
      })
    }
  }

  _action (type, payload) {
    this._dispatch(buildAction(type, payload))
  }

  _stateAction (type, state, data) {
    if (typeof state !== 'string') {
      throw new Error('State must be a string')
    }

    this._dispatch(buildAction(type, {
      state: state,
      data: data,
    }))
  }
}



export default new Dispatcher()
