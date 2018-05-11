import { create, fontMaker } from './'

export default create({
  label: {
    paddingHorizontal: 0,
    paddingVertical: 0
  },
  labelText: {
    ...fontMaker({ weight: 'Light' }),
    color: '$form_label_textColor',
    fontSize: '0.7rem',
    marginBottom: 2
  }
})
