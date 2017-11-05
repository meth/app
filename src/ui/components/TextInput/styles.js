import { create, value } from '../../styles'

export default state => ({
  styles: create({
    input: {
      fontSize: '0.8rem',
      paddingVertical: 10,
      paddingHorizontal: 7,
      borderWidth: 1,
      borderRadius: 5,
      borderColor: `$form_textInput_${state}_borderColor`,
      backgroundColor: `$form_textInput_${state}_backgroundColor`,
      color: `$form_textInput_${state}_textColor`
    }
  }),
  placeholderTextColor: value(`$form_textInput_${state}_placeholderTextColor`)
})
