import { create, fontMaker } from '../../styles'

const text = {
  ...fontMaker()
}

export default create({
  addressText: {
    ...text,
    fontSize: '0.8rem',
    textAlign: 'left',
    color: '$form_picker_textColor'
  },
  labelText: {
    ...text,
    ...fontMaker({ weight: 'Light' }),
    fontSize: '0.6rem',
    color: '$form_picker_category_textColor'
  }
})
