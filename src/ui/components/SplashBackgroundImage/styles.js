import { create, coverParent, perPlatform } from '../../styles'

export const styles = create({
  bgImage: {
    ...coverParent,
    width: '100%',
    height: perPlatform('100vh', '100%'),
    opacity: 1
  }
})

export const resizeMode = 'cover'
