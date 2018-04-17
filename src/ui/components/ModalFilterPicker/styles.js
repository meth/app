import { create, fontMaker } from '../../styles'

const optionContainer = {
  paddingVertical: 10,
  paddingHorizontal: 5,
  borderBottomWidth: 1,
  borderBottomColor: '$form_picker_borderColor'
}

export default create({
  container: {
    flex: 0,
    position: 'relative'
  },
  optionsContainer: {
    borderWidth: 1,
    borderColor: '$form_picker_borderColor',
    borderBottomWidth: 0,
    backgroundColor: '$form_picker_backgroundColor'
  },
  optionContainer: {
    ...optionContainer
  },
  optionContainerHover: {
    ...optionContainer,
    backgroundColor: '$form_picker_hoverBackgroundColor'
  },
  optionText: {
    ...fontMaker(),
    color: '$form_picker_textColor'
  }
})
