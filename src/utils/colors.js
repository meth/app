import Color from 'color'

export const toRGBA = (color, opacity) => (
  `rgba(${
    Color(color && color.hex ? color.hex() : color).rgb().array().join(', ')
  }, ${opacity})`
)

export const darken = (color, amnt) => (
  'transparent' === color ? color : Color(color).darken(amnt).hex()
)

export const lighten = (color, amnt) => (
  'transparent' === color ? color : Color(color).lighten(amnt).hex()
)
