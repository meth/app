import OpenSans from './fonts/OpenSans.ttf'
import OpenSansBold from './fonts/OpenSans-Bold.ttf'
import OpenSansBoldItalic from './fonts/OpenSans-BoldItalic.ttf'
import OpenSansExtraBold from './fonts/OpenSans-ExtraBold.ttf'
import OpenSansExtraBoldItalic from './fonts/OpenSans-ExtraBoldItalic.ttf'
import OpenSansItalic from './fonts/OpenSans-Italic.ttf'
import OpenSansLight from './fonts/OpenSans-Light.ttf'
import OpenSansLightItalic from './fonts/OpenSans-LightItalic.ttf'
import OpenSansSemiBold from './fonts/OpenSans-SemiBold.ttf'
import OpenSansSemiBoldItalic from './fonts/OpenSans-SemiBoldItalic.ttf'
import { addWebFont } from './ui/styles'

export default () => {
  addWebFont(OpenSans, 'OpenSans')
  addWebFont(OpenSansBold, 'OpenSans', { weight: 'Bold' })
  addWebFont(OpenSansItalic, 'OpenSans', { style: 'Italic' })
  addWebFont(OpenSansBoldItalic, 'OpenSans', { weight: 'Bold', style: 'Italic' })
  addWebFont(OpenSansExtraBold, 'OpenSans', { weight: 'ExtraBold' })
  addWebFont(OpenSansExtraBoldItalic, 'OpenSans', { weight: 'ExtraBold', style: 'Italic' })
  addWebFont(OpenSansLight, 'OpenSans', { weight: 'Light' })
  addWebFont(OpenSansLightItalic, 'OpenSans', { weight: 'Light', style: 'Italic' })
  addWebFont(OpenSansSemiBold, 'OpenSans', { weight: 'SemiBold' })
  addWebFont(OpenSansSemiBoldItalic, 'OpenSans', { weight: 'SemiBold', style: 'Italic' })
}
