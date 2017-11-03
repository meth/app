import { create, fontMaker } from '../../../styles'

const text = {
  ...fontMaker(),
  fontSize: '1.5rem',
  textAlign: 'center',
  color: '$startScreen_textColor'
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
    marginBottom: 20,
    maxWidth: '50%'
  },
  getStartedButton: {
    marginVertical: 40
  },
  loginLinkButtonText: {
    color: '$startScreen_linkTextColor'
  }
})
