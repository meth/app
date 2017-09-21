import { NavActions } from '../../../ui/nav'

export function push (pathName, params = {}) {
  this._dispatch(NavActions.navigate({ pathName, params }))
}

export function reset (pathName, params = {}) {
  this._dispatch(NavActions.reset({ pathName, params }))
}
