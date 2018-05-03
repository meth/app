import { create, fontMaker } from '../../../styles'

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

  /* scroll view */

  scrollView: {
    flex: 1
  },

  /* content */

  content: {
    flex: 0,
    padding: 20
  },

  /* UI error */
  uiErrorText: {
    ...fontMaker(),
    fontSize: '1.5rem',
    color: '$content_textColor'
  }
})
