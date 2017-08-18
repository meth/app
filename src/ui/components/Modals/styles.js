import { create, coverParent } from '../../styles'

export default create({
  overlay: {
    ...coverParent,
    backgroundColor: '$modal_overlay_backgroundColor',
    justifyContent: 'center',
    alignItems: 'center',
  }
})
