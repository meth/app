import React, { PureComponent } from 'react'

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

export default class Icon extends PureComponent {
  render () {
    const { name } = this.props

    if (FAIcon.hasIcon(name)) {
      return <FAIcon {...this.props} />
    }

    if (IonIcon.hasIcon(name)) {
      return <IonIcon {...this.props} />
    }

    return <MaterialCommunityIcon {...this.props} />
  }
}
