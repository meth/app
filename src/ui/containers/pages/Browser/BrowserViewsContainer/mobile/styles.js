import { create, getWindowDimensions } from '../../../../../styles'

const { width, height } = getWindowDimensions()

export default create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    paddingTop: 30
  },
  card: {
    width: width * 0.5,
    height: height * 0.5
  },
  tabsButtonContainer: {
    marginLeft: 5
  }
})
