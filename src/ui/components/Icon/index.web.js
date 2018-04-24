import React from 'react'

import FAIcon from 'react-native-vector-icons/dist/FontAwesome'
import faFontUrl from 'react-native-vector-icons/Fonts/FontAwesome.ttf'
import IonIcon from 'react-native-vector-icons/dist/Ionicons'
import ionFontUrl from 'react-native-vector-icons/Fonts/Ionicons.ttf'
import MaterialCommunityIcon from 'react-native-vector-icons/dist/MaterialCommunityIcons'
import MaterialCommunityFontUrl from 'react-native-vector-icons/Fonts/MaterialCommunityIcons.ttf'

import { addWebFont } from '../../styles'

addWebFont(faFontUrl, 'FontAwesome')
addWebFont(ionFontUrl, 'Ionicons')
addWebFont(MaterialCommunityFontUrl, 'Material Design Icons')

const Icon = props => {
  const { name } = props

  if (FAIcon.hasIcon(name)) {
    return <FAIcon {...props} />
  }

  if (IonIcon.hasIcon(name)) {
    return <IonIcon {...props} />
  }

  return <MaterialCommunityIcon {...props} />
}

// we name the component so that the static "name" property is set on the class
export default Icon
