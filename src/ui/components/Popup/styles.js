import { create, coverParent } from '../../styles'

export default create({
  popupContext: {
    ...coverParent
  },
  popup: {
    position: 'absolute'
  }
})
