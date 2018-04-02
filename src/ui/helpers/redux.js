import _ from 'lodash'
import { connect } from 'react-redux'


let store

export const setStore = s => {
  store = s
}

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
    null,
    (stateProps, dispatchProps, ownProps) => ({
      ...stateProps,
      ...ownProps,
      actions: store.actions,
      selectors: store.selectors
    }),
    { withRef: true }
  )(Component)
