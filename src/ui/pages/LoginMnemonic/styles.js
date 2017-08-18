import { create } from '../../styles'

export default create({
  container: {
    backgroundColor: '$content_backgroundColor'
  },
  divider: {
    marginVertical: 20,
    borderWidth: 1,
    borderColor: '#000',
    height: 1,
  },
  textInput: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '$form_textInput_borderColor'
  }
})
