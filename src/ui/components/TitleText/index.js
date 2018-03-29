import React from 'react'
import { Text } from 'react-native'

import styles from './styles'

export default ({ text, style }) => (
  <Text style={[ styles.text, style ]}>{text}</Text>
)
