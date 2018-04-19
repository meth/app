import React from 'react'
import PropTypes from 'prop-types'
import { Text } from 'react-native'

import ScrollView from '../ScrollView'
import styles from './styles'


const BlockOfText = ({ text, style, textStyle }) => {
  const content = (
    <Text
      style={[ styles.text ].concat(textStyle)}
    >
      {text}
    </Text>
  )

  return (
    <ScrollView
      style={[ styles.scrollView ].concat(style)}
    >
      {content}
    </ScrollView>
  )
}

BlockOfText.propTypes = {
  text: PropTypes.string,
  style: PropTypes.any,
  textStyle: PropTypes.any
}

export default BlockOfText
