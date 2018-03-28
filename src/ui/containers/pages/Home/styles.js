import { create, fontMaker, whenWidthVerySmall } from '../../../styles'

const introText = {
  ...fontMaker(),
  fontSize: '1rem',
  textAlign: 'center',
  color: '$content_textColor',
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
  intro1Text: {
    ...introText,
    ...fontMaker({ weight: 'Light' }),
    fontSize: '2.5rem',
    marginBottom: 30
  },
  intro2Text: {
    ...introText,
    maxWidth: '50%'
  },
  getStartedButton: {
    marginTop: 20,
    marginBottom: 100
  },
  loginButtonText: {
    fontSize: '0.65rem'
  },

  ...whenWidthVerySmall({
    intro2Text: {
      maxWidth: '90%'
    }
  })
})
