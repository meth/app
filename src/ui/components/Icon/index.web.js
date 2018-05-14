import faFontUrl from 'react-native-vector-icons/Fonts/FontAwesome.ttf'
import ionFontUrl from 'react-native-vector-icons/Fonts/Ionicons.ttf'
import MaterialCommunityFontUrl from 'react-native-vector-icons/Fonts/MaterialCommunityIcons.ttf'

import { addFontForWeb } from '../../../fonts'
import Component from './component'

addFontForWeb(faFontUrl, 'FontAwesome')
addFontForWeb(ionFontUrl, 'Ionicons')
addFontForWeb(MaterialCommunityFontUrl, 'Material Design Icons')

export default Component
