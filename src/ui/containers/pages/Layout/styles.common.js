import { fontMaker } from '../../../styles'

export default {
  container: {
    flex: 1,
    backgroundColor: '$content_backgroundColor',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'stretch'
  },

  uiErrorText: {
    ...fontMaker(),
    fontSize: '1.5rem',
    color: '$content_textColor'
  }
}
