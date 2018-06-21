import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Text } from 'react-native'

import ScrollView from '../ScrollView'
import CopyableText from '../CopyableText'
import styles from './styles'

export default class BlockOfText extends PureComponent {
  static propTypes = {
    text: PropTypes.string,
    style: PropTypes.any,
    blockStyle: PropTypes.any,
    blockTextStyle: PropTypes.any
  }

  render () {
    const { text, style } = this.props

    return (
      <CopyableText
        renderText={this._renderText}
        text={text}
        style={style}
      />
    )
  }

  _renderText = () => {
    const { text, blockStyle, blockTextStyle } = this.props

    return (
      <ScrollView style={[ styles.scrollView ].concat(blockStyle)}>
        <Text style={[ styles.text ].concat(blockTextStyle)}>
          {text}
        </Text>
      </ScrollView>
    )
  }
}
