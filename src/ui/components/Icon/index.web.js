import React from 'react'
import FAIcon from 'react-native-vector-icons/dist/FontAwesome'
import faFontUrl from 'react-native-vector-icons/Fonts/FontAwesome.ttf'

import { addWebFont } from '../../styles'

addWebFont('FontAwesome', faFontUrl)

const Icon = () => (
  <FAIcon {...this.props} />
)

Icon.propTypes = {}

export default Icon
