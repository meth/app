import { create, fontMaker } from '../../../styles'

const introText = {
  ...fontMaker(),
  fontSize: '1rem',
  color: '$content_textColor',
  textAlign: 'center',
  maxWidth: '90%',
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
    width: '80%'
  },
  pin: {
    marginTop: 10
  }
})
