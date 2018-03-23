import { create, fontMaker, whenWidthVerySmall } from '../../../styles'

const introText = {
  ...fontMaker(),
  fontSize: '1rem',
  color: '$startScreen_textColor',
  textAlign: 'center',
  maxWidth: '70%',
  marginBottom: 20
}

export default create({
  layoutContent: {
    backgroundColor: '$startScreen_backgroundColor',
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
    textDecorationLine: 'underline'
  },
  mnemonic: {
    marginTop: 20,
    maxWidth: '90%'
  },
  nextButton: {
    marginTop: 40,
    marginBottom: 30
  },
  loginButtonText: {
    fontSize: '0.65rem'
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
