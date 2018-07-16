import flatten from 'flat'
import { Dimensions } from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet'
import {
  setWidthBreakpoints,
  setHeightBreakpoints,
  parse
} from 'react-native-extended-stylesheet-breakpoints'

import { isWeb, isAndroid, isIos, isIphoneX } from '../../utils/deviceInfo'
import defaultTheme from './themes'
import { FONTS } from '../../fonts'

EStyleSheet.build(flatten(defaultTheme, { delimiter: '_' }))

export const theme = defaultTheme

export const getWindowDimensions = () => Dimensions.get('window')

export const value = (id, fallback) => {
  try {
    return EStyleSheet.value(id)
  } catch (err) {
    return fallback
  }
}

export const transparentBg = {
  backgroundColor: 'transparent'
}

export const centerText = {
  textAlign: 'center'
}

export const coverParent = {
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0
}

const SHADOW_MAX_LEVEL = 6
export const dropShadower = (
  level = 1,
  width = 0,
  height = 0,
  color = '#000'
) => ({
  /* ios */
  shadowColor: color,
  shadowOffset: { width, height },
  shadowOpacity: 0.3 + (0.1 * Math.min(level, SHADOW_MAX_LEVEL)),
  shadowRadius: Math.min(level, SHADOW_MAX_LEVEL) * 2,
  /* android */
  elevation: Math.min(level, SHADOW_MAX_LEVEL) * 7
})

export const fontMaker = (options = {}) => {
  const params = Object.assign(
    {
      name: 'OpenSans',
      weight: null,
      style: null
    },
    options
  )

  const { name } = params
  let { weight, style } = params

  if (isWeb) {
    return {
      fontFamily: `${name}${weight || ''}${style || ''}`,
      ...transparentBg
    }
  }

  if (isAndroid) {
    weight = FONTS[name].weights[weight] ? weight : ''
    style = FONTS[name].styles[style] ? style : ''

    const suffix = weight + style

    return {
      fontFamily: `${name}${suffix ? `-${suffix}` : ''}`
    }
  }

  if (isIos) {
    weight = FONTS[name].weights[weight] || FONTS[name].weights.Normal
    style = FONTS[name].styles[style] || 'normal'

    return {
      fontFamily: name,
      fontWeight: weight,
      fontStyle: style,
      ...transparentBg
    }
  }

  return null
}

/* S8: width=360, height=692 */

const SCREEN_WIDTH_SMALL = 700
const SCREEN_WIDTH_VERY_SMALL = 400
const SCREEN_HEIGHT_SMALL = 800
const SCREEN_HEIGHT_VERY_SMALL = 600

export const isScreenHeightSmall = () =>
  getWindowDimensions().height <= SCREEN_HEIGHT_SMALL
export const isScreenHeightVerySmall = () =>
  getWindowDimensions().height <= SCREEN_HEIGHT_VERY_SMALL
export const isScreenWidthSmall = () =>
  getWindowDimensions().width <= SCREEN_WIDTH_SMALL
export const isScreenWidthVerySmall = () =>
  getWindowDimensions().width <= SCREEN_WIDTH_VERY_SMALL

export const perWidth = setWidthBreakpoints(SCREEN_WIDTH_SMALL, SCREEN_WIDTH_VERY_SMALL)
export const perHeight = setHeightBreakpoints(SCREEN_HEIGHT_SMALL, SCREEN_HEIGHT_VERY_SMALL)
export const create = def => EStyleSheet.create(parse(def))

export const perPlatform = (web, mobile) => {
  if (isWeb) {
    return web
  }

  return mobile || web
}

export const getHeaderHeight = () => {
  // from https://github.com/react-navigation/react-navigation/blob/8ec2466fefc7b0a22dde088bd982e20bdfb2c767/src/views/StackView/StackViewLayout.js#L474
  if (isAndroid) {
    return 56
  }
  else if (isIphoneX) {
    return 88
  }
  else if (isIos) {
    return 64
  }

  return 40 /* isWeb */
}
