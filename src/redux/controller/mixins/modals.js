import { Actions } from '../../actions'

export function show(type) {
  this._log.debug(`Show modal: ${type}`)

  this._action(Actions.SHOW_MODAL, type)
}

export function hide(type) {
  this._log.debug(`Hide modal: ${type}`)

  this._action(Actions.HIDE_MODAL, type)
}
