import { create, fontMaker } from '../../styles'

const text = {
  ...fontMaker(),
  color: '$button_picker_enabled_textColor'
}

export default create({
  buttonContent: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 5
  },
  buttonText: {
    ...text,
    fontSize: '1rem'
  },
  buttonIconText: {
    ...text,
    fontSize: '1.2rem'
  }
})
