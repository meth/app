import { create, fontMaker, whenWidthVerySmall } from '../../styles'

const text = {
  ...fontMaker(),
  color: '$button_picker_enabled_default_textColor'
}

export default create({
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  text: {
    ...text,
    fontSize: '1rem'
  },
  iconText: {
    ...text,
    fontSize: '1.2rem',
    marginTop: -2
  },

  ...whenWidthVerySmall({
    text: {
      fontSize: '0.8rem'
    },
    iconText: {
      fontSize: '1rem'
    }
  })
})
