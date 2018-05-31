import React, { PureComponent } from 'react'
import { View } from 'react-native'

import styles from './styles'


export default class BrowserViewsContainer extends PureComponent {
  render () {
    const { views, style } = this.props

    return (
      <View style={[ styles.container ].concat(style)}>
        {views.map(({ id, active, renderedChild }) => (
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
