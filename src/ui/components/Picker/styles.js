import { create, fontMaker } from '../../styles'

export default create({
  container: {
    flex: 0,
    position: 'relative'
  },
  optionsContainer: {
    borderWidth: 1,
    borderColor: '$form_picker_borderColor',
    backgroundColor: '$form_picker_backgroundColor'
  },
  optionContainer: {
    paddingVertical: 10,
    paddingHorizontal: 5,
    borderBottomWidth: 1,
    borderBottomColor: '$form_picker_borderColor'
  },
  optionText: {
    ...fontMaker(),
    color: '$form_picker_textColor'
  }
})
