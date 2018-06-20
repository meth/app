import { create } from '../../../styles'
import commonStyles from './styles.common'

export default () => create({
  ...commonStyles,

  header: {
    height: 0
  },
  scrollView: {
    flex: 1,
    width: '100%',
    height: 'auto'
  },
  content: {
    width: '100%',
    height: 'auto'
  }
})
