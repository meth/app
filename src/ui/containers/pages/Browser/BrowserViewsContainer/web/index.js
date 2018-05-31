import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { View } from 'react-native'

import styles from './styles'


export default class BrowserViewsContainer extends PureComponent {
  static propTypes = {
    views: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
      active: PropTypes.bool,
      renderedChild: PropTypes.element
    })),
    style: PropTypes.any
  }

  render () {
    const { views, style } = this.props

    return (
      <View style={[ styles.container ].concat(style)}>
        {views.map(({ id, renderedChild, active }) => (
          <View
            key={id}
            style={active ? styles.activeView : styles.inactiveView}
          >
            {renderedChild}
          </View>
        ))}
      </View>
    )
  }
}
