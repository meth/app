import _ from 'lodash'
import { connect } from 'react-redux'

/**
 * Decorator: Connect a component to the Redux store
 */
export const connectStore = (...storeSubParts) => Component =>
  connect(
    // mapStateToProps
    state =>
      _.reduce(
        state,
        (m, item, key) => {
          if (!storeSubParts.length || storeSubParts.includes(key)) {
            return {
              ...m,
              [key]: item
            }
          }

          return m
        },
        {}
      ),
    null,
    null,
    { withRef: true }
  )(Component)

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
