import React from 'react'
import { Text, View } from 'react-native'

import Button from '../Button'
import Icon from '../Icon'
import styles from './styles'

export default ({ options, selected, style }) => {
  const { label } = options.find(({ value }) => value === selected)

  const content = (
    <View style={styles.buttonContent}>
      <Text style={styles.buttonText}>{label}</Text>
      <Icon style={styles.buttonIconText} name="sort-desc" />
    </View>
  )

  return (
    <Button
      style={style}
      type="picker">
      {content}
    </Button>
  )
}
