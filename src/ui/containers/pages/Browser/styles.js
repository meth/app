import { create, coverParent } from '../../../styles'

export default create({
  layoutContent: {
    padding: 0
  },
  browserViews: {
    position: 'relative',
    flex: 1
  },
  activeView: {
    ...coverParent
  },
  inactiveView: {
    height: 0,
    width: 0,
    transform: [ { translateX: -5000 }, { translateY: -5000 } ]
  }
})
