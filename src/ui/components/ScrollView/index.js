import React from 'react'
import { ScrollView } from 'react-native'

export default props => (
  <ScrollView
    showsVerticalScrollIndicator={true}
    showsHorizontalScrollIndicator={false}
    overScrollMode='never'
    {...props}
  />
)
