import { create, fontMaker, perWidth, perHeight } from '../../../styles'

const introText = {
  ...fontMaker({ weight: 'SemiBold' }),
  fontSize: '1rem',
  textAlign: 'center',
  color: '$splashContent_textColor',
  maxWidth: '90%',
  marginBottom: 20
}

const LOGO_WIDTH = perWidth(250, 180)
const LOGO_HEIGHT = perHeight(250, 180, 150)

export default create({
  layoutContent: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  logoView: {
    width: LOGO_WIDTH,
    height: LOGO_HEIGHT,
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'stretch'
  },
  logoImage: {
    width: LOGO_WIDTH,
    height: LOGO_HEIGHT
  },
  intro2Text: {
    ...introText,
    maxWidth: perWidth('50%', '90%')
  },
  getStartedButton: {
    marginTop: 20,
    marginBottom: 20
  },
  getStartedButtonText: {
    fontSize: '1.5rem'
  },
  loginButtonText: {
    fontSize: '0.7rem'
  },
  linkButton: {
    marginTop: 80
  }
})
