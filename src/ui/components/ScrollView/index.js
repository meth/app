import React from 'react'
import { ScrollView } from 'react-native'

const CustomScrollView = props => (
  <ScrollView
    showsVerticalScrollIndicator={true}
    showsHorizontalScrollIndicator={false}
    overScrollMode='never'
    {...props}
  />
)


export default CustomScrollView
