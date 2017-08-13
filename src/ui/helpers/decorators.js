import _ from 'lodash'
import { connect } from 'react-redux'


/**
 * Connect a component to the Redux store
 */
export const connectRedux = () => (Component) => connect(
  // mapStateToProps
  (state) => {
    const stateAsObject = _.reduce(state, (m, item, key) => {
      m[key] = item.toObject ? item.toObject() : item
      return m
    }, {})

    return {
      store: stateAsObject,
    }
  },
  null,
  null,
  { withRef: true }
)(Component)
