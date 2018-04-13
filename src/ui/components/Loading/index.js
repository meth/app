import React from 'react'
import { ActivityIndicator } from 'react-native'

import { value } from '../../styles'

const Loading = ({ color, size, ...props }) => (
  <ActivityIndicator
    color={color || value('$loading_spinnerColor')}
    size={size || 'small'}
    {...props}
  />
)

export default Loading
