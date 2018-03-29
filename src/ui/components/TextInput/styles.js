import { create, value } from '../../styles'

export default state => {
  const baseStyle = {
    fontSize: '0.8rem',
    paddingVertical: 10,
    paddingHorizontal: 7,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: `$form_textInput_${state}_borderColor`,
    backgroundColor: `$form_textInput_${state}_backgroundColor`,
    color: `$form_textInput_${state}_textColor`
  }

  return {
    styles: create({
      normal: {
        ...baseStyle
      },
      error: {
        ...baseStyle,
        backgroundColor: `$form_textInput_error_backgroundColor`
      }
    }),
    placeholderTextColor: value(`$form_textInput_${state}_placeholderTextColor`)
  }
}
