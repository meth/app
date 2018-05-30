import { create } from '../../../styles'

export default create({
  layoutContent: {
    flex: 1,
    backgroundColor: '$content_backgroundColor',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'stretch'
  },
  browserViews: {
    position: 'relative',
    flex: 1
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
