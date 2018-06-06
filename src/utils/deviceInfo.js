import { Dimensions, Platform } from 'react-native'

export const isWeb = 'web' === Platform.OS
export const isAndroid = 'android' === Platform.OS
export const isIos = 'ios' === Platform.OS

const { width: WINDOW_WIDTH, height: WINDOW_HEIGHT } = Dimensions.get('window')

export const isIphoneX =
  Platform.OS === 'ios' &&
  !Platform.isPad &&
  !Platform.isTVOS &&
  (WINDOW_HEIGHT === 812 || WINDOW_WIDTH === 812)
