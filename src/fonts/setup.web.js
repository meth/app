import OpenSans from './OpenSans.ttf'
import OpenSansBold from './OpenSans-Bold.ttf'
import OpenSansBoldItalic from './OpenSans-BoldItalic.ttf'
import OpenSansExtraBold from './OpenSans-ExtraBold.ttf'
import OpenSansExtraBoldItalic from './OpenSans-ExtraBoldItalic.ttf'
import OpenSansItalic from './OpenSans-Italic.ttf'
import OpenSansLight from './OpenSans-Light.ttf'
import OpenSansLightItalic from './OpenSans-LightItalic.ttf'
import OpenSansSemiBold from './OpenSans-SemiBold.ttf'
import OpenSansSemiBoldItalic from './OpenSans-SemiBoldItalic.ttf'

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

export const initialSetup = () => {
  addWebFont(OpenSans, 'OpenSans')
  addWebFont(OpenSansBold, 'OpenSans', { weight: 'Bold' })
  addWebFont(OpenSansItalic, 'OpenSans', { style: 'Italic' })
  addWebFont(OpenSansBoldItalic, 'OpenSans', {
    weight: 'Bold',
    style: 'Italic'
  })
  addWebFont(OpenSansExtraBold, 'OpenSans', { weight: 'ExtraBold' })
  addWebFont(OpenSansExtraBoldItalic, 'OpenSans', {
    weight: 'ExtraBold',
    style: 'Italic'
  })
  addWebFont(OpenSansLight, 'OpenSans', { weight: 'Light' })
  addWebFont(OpenSansLightItalic, 'OpenSans', {
    weight: 'Light',
    style: 'Italic'
  })
  addWebFont(OpenSansSemiBold, 'OpenSans', { weight: 'SemiBold' })
  addWebFont(OpenSansSemiBoldItalic, 'OpenSans', {
    weight: 'SemiBold',
    style: 'Italic'
  })
}
