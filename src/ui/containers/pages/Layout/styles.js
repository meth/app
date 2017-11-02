import { create } from '../../../styles'

export default create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'stretch'
  },

  /* header */

  header: {
    flex: 0,
    height: 36,
    paddingVertical: 5
  },

  /* content */

  content: {
    flex: 1,
    padding: 20
  }
})
