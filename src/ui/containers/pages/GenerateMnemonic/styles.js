import { create, fontMaker, whenWidthVerySmall } from '../../../styles'

const introText = {
  ...fontMaker(),
  fontSize: '1rem',
  color: '$content_textColor',
  textAlign: 'center',
  maxWidth: '75%',
  marginBottom: 25
}

export default create({
  layoutContent: {
    paddingVertical: 50,
    backgroundColor: '$content_backgroundColor',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  intro1Text: {
    ...introText,
    ...fontMaker({ weight: 'Light' }),
    fontSize: '1.5rem'
  },
  intro2Text: {
    ...introText,
    ...fontMaker({ weight: 'Bold' }),
    fontSize: '0.8rem',
    textDecorationLine: 'underline',
    width: '60%'
  },
  mnemonic: {
    maxWidth: '90%'
  },
  nextButton: {
    marginTop: 40
  },
  nextButtonText: {
    fontSize: '1rem'
  },
  loginButton: {
    marginTop: 40
  },
  loginButtonText: {
    fontSize: '0.7rem'
  },

  ...whenWidthVerySmall({
    intro1Text: {
      maxWidth: '90%'
    },
    intro2Text: {
      maxWidth: '90%'
    }
  })
})
