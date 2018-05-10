import React from 'react'
import { View } from 'react-native'

import styles from './styles'


const FormWrapper = ({ style, children }) => (
  <View style={[ styles.container ].concat(style)}>
    {children}
  </View>
)

export default FormWrapper
