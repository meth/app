import { create, getWindowDimensions } from '../../../../../styles'

const { width, height } = getWindowDimensions()

export default create({
  container: {
    paddingTop: 50,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'stretch'
  },
  card: {
    width: width * 0.5,
    minHeight: height * 0.5
  },
  tabsButtonContainer: {
    marginLeft: 5
  }
})
