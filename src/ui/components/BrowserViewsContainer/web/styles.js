import { create } from '../../../styles'

export default create({
  container: {
    position: 'relative'
  },
  activeView: {
    flex: 1
  },
  inactiveView: {
    height: 0,
    width: 0,
    transform: [ { translateX: -5000 }, { translateY: -5000 } ]
  }
})
