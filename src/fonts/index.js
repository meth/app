import { initialSetup, addWebFont } from './setup'

export const setupFonts = () => initialSetup()

export const addFontForWeb = addWebFont

export const FONTS = {
  OpenSans: {
    weights: {
      ExtraBold: '800',
      Bold: '700',
      SemiBold: '600',
      Light: '300',
      Normal: '400'
    },
    styles: {
      Italic: 'italic'
    }
  }
}
