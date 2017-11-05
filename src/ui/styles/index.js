import flatten from 'flat'
import { Dimensions } from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet'

import defaultTheme from './themes'

EStyleSheet.build(flatten(defaultTheme, { delimiter: '_' }))

export const theme = defaultTheme

export const screen = Dimensions.get('window')

export const create = EStyleSheet.create.bind(EStyleSheet)

export const value = EStyleSheet.value.bind(EStyleSheet)

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
  const { weight, style } = Object.assign(
    {
      weight: null,
      style: null
    },
    options
  )

  return {
    fontWeight: weight,
    fontStyle: style,
    ...transparentBg
  }
}

export const addWebFont = (fontName, fontUrl) => {
  // Generate required css
  const iconFontStyles = `@font-face {
    src: url(${fontUrl});
    font-family: FontAwesome;
  }`

  // Create stylesheet
  const style = document.createElement('style')
  style.type = 'text/css'
  if (style.styleSheet) {
    style.styleSheet.cssText = iconFontStyles
  } else {
    style.appendChild(document.createTextNode(iconFontStyles))
  }

  // Inject stylesheet
  document.head.appendChild(style)
}
