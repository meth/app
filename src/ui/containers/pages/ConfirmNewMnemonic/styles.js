import { create, fontMaker, whenWidthVerySmall } from '../../../styles'

const text = {
  ...fontMaker(),
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
  intro1Text: {
    ...text,
    ...fontMaker({ weight: 'Light' }),
    fontSize: '1.5rem',
    marginBottom: 30
  },
  intro2Text: {
    ...text
  },
  confirmator: {
    marginTop: 30,
    maxWidth: '80%'
  },
  nextButton: {
    marginTop: 40,
    marginBottom: 30
  },
  goBackButtonText: {
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
