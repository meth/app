import { Actions } from '../../actions'

module.exports = {
  show: function (type) {
    this._log.debug(`Show modal: ${type}`)

    this._action(Actions.SHOW_MODAL, type)
  },

  hide: function (type) {
    this._log.debug(`Hide modal: ${type}`)

    this._action(Actions.HIDE_MODAL, type)
  }
}
