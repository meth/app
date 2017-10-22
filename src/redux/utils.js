/**
 * Extract Redux store values from given props, ensuring all immutables
 * are converted into mutables
 */
export const mutable = (props, ...keys) =>
  (keys.length ? keys : Object.keys(props)).reduce(
    (m, k) => ({
      ...m,
      [k]: props[k] && props[k].toObject ? props[k].toObject() : props[k]
    }),
    {}
  )


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
    return (1 === args.length ? args[0] : args)
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
