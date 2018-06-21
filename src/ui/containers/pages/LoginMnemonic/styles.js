import { create, fontMaker, perWidth } from '../../../styles'

const introText = {
  ...fontMaker({ weight: 'SemiBold' }),
  fontSize: '1.5rem',
  color: '$splashContent_textColor',
  textAlign: 'center',
  maxWidth: '70%',
  marginBottom: 20
}

export default create({
  layoutContent: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  introText: {
    ...introText,
    width: perWidth('auto', 'auto', '90%'),
    marginBottom: 40
  },
  formWrapper: {
    width: perWidth(400, '90%')
  },
  nextButton: {
    marginTop: 40,
    marginBottom: 70
  },
  nextButtonText: {
    fontSize: '1rem'
  },
  createPasswordButtonText: {
    fontSize: '0.7rem'
  }
})
