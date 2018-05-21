import { create, fontMaker } from '../../../styles'

export default create({
  container: {
    flex: 1,
    backgroundColor: '$content_backgroundColor',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    width: '100%'
  },

  /* header */

  header: {
    flex: 0,
    height: 36,
    paddingVertical: 5
  },

  /* scroll view */

  scrollView: {
    flex: 1,
    width: '100%'
  },

  /* content */

  content: {
    width: '100%'
  },

  /* UI error */
  uiErrorText: {
    ...fontMaker(),
    fontSize: '1.5rem',
    color: '$content_textColor'
  }
})
