import { create, fontMaker, perWidth } from '../../../styles'

export default create({
  // $outline: 1,
  layoutContent: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    height: '100%',
    maxWidth: perWidth(600, '100%'),
    paddingTop: perWidth(10, 0),
    paddingRight: perWidth(10, 0),
    paddingLeft: perWidth(10, 0)
  },
  topLevelLoading: {
    flex: 1,
    alignSelf: 'center'
  },
  table: {
    flex: 1,
    width: '100%'
  },
  tableFilterRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5
  },
  tableFilterInput: {
    flex: 1,
    fontSize: '0.7rem',
    paddingVertical: 7
  },
  tableFilterButton: {
    paddingVertical: 5,
    paddingHorizontal: 5,
    marginLeft: 5
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
  },
  tableRowButtonAddressText: {
    ...fontMaker(),
    textAlign: 'left'
  }
})
