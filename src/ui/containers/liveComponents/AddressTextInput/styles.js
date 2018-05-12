import { create } from '../../../styles'

export default create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  textInput: {
    flex: 1
  },
  picker: {
    flex: 0,
    marginLeft: 5
  },
  pickerButtonIcon: {
    fontSize: '0.8rem',
    color: '$button_default_enabled_default_textColor'
  },
  addToAddressBookButton: {
    flex: 0,
    marginLeft: 5
  }
})
