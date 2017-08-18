import { NavActions } from '../../../ui/nav'

module.exports = {
  push: function (pathName, params = {}) {
    this._dispatch(NavActions.navigate({ pathName, params }))
  },

  reset: function (pathName, params = {}) {
    this._dispatch(NavActions.reset({ pathName, params }))
  }
}
