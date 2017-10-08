import _ from 'lodash'

/**
 * Helper to extract Redux store values from this.props, ensure all immutables
 * are converted into mutables
 */
export const mutable = props =>
  _.reduce(
    props,
    (m, v, k) => ({
      ...m,
      [k]: _.isFunction(v.toObject) ? v.toObject() : v
    }),
    {}
  )
