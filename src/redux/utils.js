/**
 * Create action.
 * @param  {String} action
 * @param  {Object} payload
 * @return {Object}
 */
export const createAction = (action, payload) => ({
  type: action,
  ...(undefined !== payload ? { payload } : undefined)
})

const defaultPayloadFn = (...args) => {
  if (args.length) {
    return 1 === args.length ? args[0] : args
  }

  return undefined
}

/**
 * Create action creator function.
 * @param  {String} action    [description]
 * @param  {Function} [payloadFn]
 * @return {Function}
 */
export const createActionCreator = (action, payloadFn) => (...args) =>
  createAction(action, (payloadFn || defaultPayloadFn)(...args))
