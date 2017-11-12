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
    // mapDispatchToProps
    dispatch => ({
      actions: bindActionCreators(actionCreators, dispatch)
    }),
    null,
    { withRef: true }
  )(Component)
