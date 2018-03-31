import Color from 'color'

export const colorTransparent = 'transparent'

// export const color2 = '#2980b9'
// export const color3 = '#3498db'
// export const color7 = '#FFE11A'

export const colorRed = '#fd4100'
export const colorOrange = '#fd7400'
export const colorPurpleDark = '#650566'
export const colorPurple = '#b008b2'
export const colorPurpleLight = '#FC0BFF'
export const colorGreen = '#5CB22B'
export const colorYellowLight = '#ffffaa'
export const colorBlack = '#000'
export const colorWhite = '#fff'
export const colorGrayLight = '#ccc'
export const colorGray = '#9a9a9a'
export const colorGrayDark = '#777'
export const colorGrayDarker = '#444'
export const colorGrayDarkest = '#222'


export const toRGBA = (color, opacity) =>
  `rgba(${Color(color && color.hex ? color.hex() : color)
    .rgb()
    .array()
    .join(', ')}, ${opacity})`

export const darken = (color, amnt) =>
  ('transparent' === color ? color : Color(color).darken(amnt).hex())

export const lighten = (color, amnt) =>
  ('transparent' === color ? color : Color(color).lighten(amnt).hex())
