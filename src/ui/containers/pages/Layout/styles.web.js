import { create, getWindowDimensions } from '../../../styles'
import commonStyles from './styles.common'

const HEADER_HEIGHT = 36

export default () => create({
  ...commonStyles,

  header: {
    flex: 0,
    height: HEADER_HEIGHT,
    paddingVertical: 5
  },
  scrollView: {
    flex: 1,
    width: '100%',
    height: getWindowDimensions().height - HEADER_HEIGHT
  },
  content: {
    width: '100%',
    height: 'auto'
  }
})
