import { create, perWidth } from '../../../styles'

export default create({
  layoutContent: {
    flex: 1,
    backgroundColor: '$content_backgroundColor',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    maxWidth: perWidth(700, '100%'),
    paddingTop: perWidth(10, 0),
    paddingRight: perWidth(10, 0),
    paddingLeft: perWidth(10, 0)
  },
  topLevelLoading: {
    flex: 1
  },
  noTransactionsYetAlert: {
    marginTop: 10,
    marginHorizontal: perWidth(0, 10)
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
