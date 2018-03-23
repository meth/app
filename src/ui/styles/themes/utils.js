import { darken } from '../../../utils/colors'

export const generateButtonStyles = props => ({
  enabled: {
    default: props.default,
    hover: props.hover
  },
  disabled: {
    default: {
      borderColor: darken(props.default.borderColor, 0.5),
      backgroundColor: darken(props.default.backgroundColor, 0.5),
      textColor: darken(props.default.textColor, 0.5)
    },
    hover: {
      borderColor: darken(props.hover.borderColor, 0.5),
      backgroundColor: darken(props.hover.backgroundColor, 0.5),
      textColor: darken(props.hover.textColor, 0.5)
    }
  }
})
