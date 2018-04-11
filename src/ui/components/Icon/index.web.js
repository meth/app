import React from 'react'

import FAIcon from 'react-native-vector-icons/dist/FontAwesome'
import IonIcon from 'react-native-vector-icons/dist/Ionicons'
import faFontUrl from 'react-native-vector-icons/Fonts/FontAwesome.ttf'
import ionFontUrl from 'react-native-vector-icons/Fonts/Ionicons.ttf'

import { addWebFont } from '../../styles'

addWebFont(faFontUrl, 'FontAwesome')
addWebFont(ionFontUrl, 'Ionicons')

export default props => {
  const { name } = props

  if (IonIcon.hasIcon(name)) {
    return <IonIcon {...props} />
  }

  return <FAIcon {...props} />
}
