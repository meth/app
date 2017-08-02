import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { Dispatcher } from '../../data/actions';


/**
 * Connect a component to the Redux store and dispatcher.
 */
export function connectRedux() {
  return function decorator(Component) {
    return connect(
      function mapStateToProps(state) {
        return {
          data: state,
          web3: state.app.get('web3'),
          dispatcher: Dispatcher,
        };
      },
      null,
      null,
      { withRef: true }
    )(Component);
  }
}

/**
 * Connect a component to router.
 */
export function connectRouter() {
  return function decorator(Component) {
    return React.createClass({
      contextTypes: {
        router: React.PropTypes.object.isRequired,
        location: React.PropTypes.object.isRequired,
        routeParams: React.PropTypes.object,
      },

      render: function() {
        let props = _.extend({}, this.props, this.context);

        return (
          <Component {...props} />
        );
      }
    });
  };
}


