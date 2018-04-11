import React from 'react'
import { ActivityIndicator } from 'react-native'

import { value } from '../../styles'

export default ({ color, size, ...props }) => (
  <ActivityIndicator
    color={color || value('$loading_spinnerColor')}
    size={size || 'small'}
    {...props}
  />
)
