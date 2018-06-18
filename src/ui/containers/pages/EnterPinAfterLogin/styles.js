import { create, fontMaker } from '../../../styles'

const introText = {
  ...fontMaker({ weight: 'SemiBold' }),
  fontSize: '1rem',
  color: '$splashContent_textColor',
  textAlign: 'center',
  maxWidth: '90%',
  marginBottom: 25
}

export default create({
  layoutContent: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  intro1Text: {
    ...introText,
    fontSize: '1.5rem'
  },
  pin: {
    marginTop: 10,
    marginBottom: 50
  },
  forgotPinButtonText: {
    fontSize: '0.8rem'
  }
})
