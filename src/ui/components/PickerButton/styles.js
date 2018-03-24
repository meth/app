import { create, fontMaker, whenWidthVerySmall } from '../../styles'

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
  },

  ...whenWidthVerySmall({
    content: {
      padding: 0
    },
    text: {
      fontSize: '0.8rem'
    },
    iconText: {
      fontSize: '1rem'
    }
  })
})
