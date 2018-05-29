import { create, perWidth } from '../../../styles'

export default create({
  // $outline: 1,
  layoutContent: {
    flex: 1,
    backgroundColor: '$content_backgroundColor',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    height: '100%',
    maxWidth: perWidth(600, '100%'),
    paddingTop: perWidth(10, 0),
    paddingRight: perWidth(10, 0),
    paddingLeft: perWidth(10, 0)
  },
  table: {
    flex: 1,
    width: '100%'
  },
  tableFilter: {
    marginBottom: 5
  },
  tableRow: {
    paddingVertical: 0,
    paddingHorizontal: 0,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  tableRowData: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    padding: 20,
    borderRadius: 0
  }
})
