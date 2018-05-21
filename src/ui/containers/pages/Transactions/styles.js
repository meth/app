import { create } from '../../../styles'

export default create({
  layoutContent: {
    // $outline: 1,
    backgroundColor: '$content_backgroundColor',
    borderTopWidth: 1,
    borderTopColor: '$content_borderTop_color',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'stretch'
  },
  topLevelLoading: {
    flex: 1
  },
  noTransactionsYetAlert: {
    marginTop: 10,
    marginHorizontal: 10
  },
  /* table */
  table: {
    flex: 1,
    width: '100%'
  },
  /* tx row */
  tx: {
    width: '100%'
  }
})
