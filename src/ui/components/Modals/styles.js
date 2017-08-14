import { create, coverParent } from '../../styles'

export default create({
  overlay: {
    ...coverParent,
    backgroundColor: '$modal_overlay_backgroundColor',
    opacity: 0.8,
    justifyContent: 'center',
    alignItems: 'center',
  }
})
