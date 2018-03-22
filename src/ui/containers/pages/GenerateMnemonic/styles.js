import { create, fontMaker } from '../../../styles'

const introText = {
  ...fontMaker(),
  fontSize: '1.5rem',
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
    ...introText
  },
  intro3Text: {
    ...introText,
    ...fontMaker({ weight: 'Bold' }),
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
  }
})
