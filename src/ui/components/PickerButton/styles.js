import { create, fontMaker } from '../../styles'

const text = {
  ...fontMaker(),
  color: '$button_picker_enabled_default_textColor'
}

export default create({
  content: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 5
  },
  text: {
    ...text,
    fontSize: '1rem'
  },
  iconText: {
    ...text,
    fontSize: '1.2rem'
  }
})
