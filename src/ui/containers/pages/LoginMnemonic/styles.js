import { create, fontMaker, whenWidthVerySmall } from '../../../styles'

const text = {
  ...fontMaker(),
  fontSize: '1.5rem',
  color: '$content_textColor',
  textAlign: 'center',
  maxWidth: '70%',
  marginBottom: 20
}

export default create({
  layoutContent: {
    backgroundColor: '$content_backgroundColor',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  introText: {
    ...text,
    ...fontMaker({ weight: 'Light' }),
    marginBottom: 40
  },
  formWrapper: {
    width: '70%'
  },
  nextButton: {
    marginTop: 40,
    marginBottom: 70
  },
  createPasswordButtonText: {
    fontSize: '0.6rem'
  },

  ...whenWidthVerySmall({
    introText: {
      width: '90%'
    },
    textInput: {
      width: '90%'
    }
  })
})
