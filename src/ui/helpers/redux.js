import _ from 'lodash'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import actionCreators from '../../redux/actionCreators'

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
    dispatch => ({
      actions: bindActionCreators(actionCreators, dispatch)
    }),
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
