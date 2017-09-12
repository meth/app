import React, { PureComponent } from 'react'
import FAIcon from 'react-native-vector-icons/dist/FontAwesome'
import faFontUrl from 'react-native-vector-icons/Fonts/FontAwesome.ttf'

import { addWebFont } from '../../styles'

addWebFont('FontAwesome', faFontUrl)

export default class Icon extends PureComponent {
  render() {
    return <FAIcon {...this.props} />
  }
}
