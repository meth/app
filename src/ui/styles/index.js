import flatten from 'flat'
import { Platform, Dimensions } from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet'

import defaultTheme from './themes'

const isWebPlatform = ('web' === Platform.OS)

EStyleSheet.build(flatten(defaultTheme, { delimiter: '_' }))

export const theme = defaultTheme

export const getWindowDimensions = () => Dimensions.get('window')

export const create = EStyleSheet.create.bind(EStyleSheet)

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
  const { name, weight, style } = Object.assign(
    {
      name: 'OpenSans',
      weight: null,
      style: null
    },
    options
  )

  return (isWebPlatform) ? {
    fontFamily: `${name}${weight || ''}${style || ''}`,
    ...transparentBg
  } : {
    fontFamily: name,
    fontWeight: weight,
    fontStyle: style,
    ...transparentBg
  }
}

export const addWebFont = (url, name, { weight = null, style = null } = {}) => {
  // Generate required css
  const fontStyles = `@font-face {
    src: url(${url});
    font-family: ${name}${weight || ''}${style || ''};
  }`

  // Create stylesheet
  const styleElem = document.createElement('style')
  styleElem.type = 'text/css'
  if (styleElem.styleSheet) {
    styleElem.styleSheet.cssText = fontStyles
  } else {
    styleElem.appendChild(document.createTextNode(fontStyles))
  }

  // Inject stylesheet
  document.head.appendChild(styleElem)
}
