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

/**
 * Helper to create selector for extracting Redux store state, with the ability
 * to specify a subset to extract
 */
export const mutableSelector = (...subStates) => state =>
  _.reduce(
    subStates.length ? subStates : Object.keys(state),
    (m, v) => ({
      ...m,
      [v]:
        state[v] && _.isFunction(state[v].toObject)
          ? state[v].toObject()
          : state[v]
    }),
    {}
  )
