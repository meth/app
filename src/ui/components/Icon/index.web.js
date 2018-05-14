import faFontUrl from 'react-native-vector-icons/Fonts/FontAwesome.ttf'
import ionFontUrl from 'react-native-vector-icons/Fonts/Ionicons.ttf'
import MaterialCommunityFontUrl from 'react-native-vector-icons/Fonts/MaterialCommunityIcons.ttf'

import { addWebFont } from '../../styles'
import Component from './component'

addWebFont(faFontUrl, 'FontAwesome')
addWebFont(ionFontUrl, 'Ionicons')
addWebFont(MaterialCommunityFontUrl, 'Material Design Icons')

export default Component
