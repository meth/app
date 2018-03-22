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
  introText: {
    ...text,
    marginBottom: 40
  },
  textInput: {
    width: '70%'
  },
  nextButton: {
    marginTop: 40,
    marginBottom: 40
  },
  createPasswordButtonText: {
    fontSize: '0.65rem'
  }
})
