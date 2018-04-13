import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { View, Text } from 'react-native'

import styles from './styles'
import Icon from '../Icon'

export default class IconText extends PureComponent {
  static propTypes = {
    icon: PropTypes.shape(Icon.propTypes),
    style: PropTypes.any,
    textStyle: PropTypes.any
  }

  render () {
    const { icon, text, style, textStyle } = this.props

    return (
      <View style={[ styles.container, style ]}>
        <Icon {...icon} />
        <Text style={[ styles.text, textStyle ]}>{text}</Text>
      </View>
    )
  }
}
