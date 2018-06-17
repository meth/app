import { create, fontMaker, perWidth, getHeaderHeight } from '../../../styles'

const introText = {
  ...fontMaker({ weight: 'SemiBold' }),
  color: '$content_textColor',
  textAlign: 'center',
  maxWidth: '70%',
  marginBottom: 20
}

export default create({
  layoutContent: {
    paddingVertical: Math.max(getHeaderHeight() + 10, 50),
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  intro1Text: {
    ...introText,
    fontSize: '1.5rem',
    marginBottom: 30,
    maxWidth: perWidth('100%', '100%', '90%')
  },
  intro2Text: {
    ...introText,
    maxWidth: perWidth('100%', '100%', '90%')
  },
  confirmator: {
    marginTop: 30,
    maxWidth: '80%'
  },
  nextButton: {
    marginTop: 40,
    marginBottom: 30
  },
  nextButtonText: {
    fontSize: '1rem'
  },
  goBackButtonText: {
    fontSize: '0.7rem'
  }
})
