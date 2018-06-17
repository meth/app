import { create, fontMaker, whenWidthSmall, whenWidthVerySmall } from '../../../styles'

const introText = {
  ...fontMaker({ weight: 'SemiBold' }),
  fontSize: '1.5rem',
  color: '$content_textColor',
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
    marginBottom: 40
  },
  formWrapper: {
    width: '70%'
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
  },

  ...whenWidthSmall({
    formWrapper: {
      width: '95%'
    }
  }),

  ...whenWidthVerySmall({
    introText: {
      width: '90%'
    }
  })
})
