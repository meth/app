import { create, perPlatform } from '../../styles'

export default create({
  popupContext: {
    width: '100%',
    height: perPlatform('100vh', '100%')
  },
  popup: {
    position: 'absolute'
  }
})
