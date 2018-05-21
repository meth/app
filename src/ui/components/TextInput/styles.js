import _ from 'lodash'
import { create, value } from '../../styles'

export default _.memoize(state => {
  const baseStyle = {
    fontSize: '0.8rem',
    paddingVertical: 10,
    paddingHorizontal: 7,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: `$form_textInput_${state}_borderColor`,
    backgroundColor: `$form_textInput_${state}_backgroundColor`,
    color: `$form_textInput_${state}_textColor`,
    /* for mult-line inputs limit the height */
    maxHeight: 250
  }

  return {
    styles: create({
      normal: {
        ...baseStyle
      },
      error: {
        ...baseStyle,
        backgroundColor: `$form_textInput_error_backgroundColor`
      },
      disabled: {
        ...baseStyle,
        backgroundColor: `$form_textInput_disabled_backgroundColor`
      }
    }),
    placeholderTextColor: value(`$form_textInput_${state}_placeholderTextColor`)
  }
})
