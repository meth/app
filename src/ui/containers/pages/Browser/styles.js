import { create, coverParent } from '../../../styles'

export default create({
  layoutContent: {
    flex: 0,
    padding: 10,
    backgroundColor: '$content_backgroundColor',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    width: '100%'
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
