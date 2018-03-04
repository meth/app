import { create, fontMaker } from '../../../styles'

const text = {
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
    ...text
  },
  intro2Text: {
    ...text
  },
  intro3Text: {
    ...text,
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
  linkButtonText: {
    color: '$startScreen_linkTextColor'
  }
})
