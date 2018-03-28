import { create, fontMaker } from '../../styles'

export const styles = create({
  // $outline: 1,
  table: {
    justifyContent: 'flex-start',
    alignItems: 'stretch'
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  headerColumn: {
    flex: 1,
    backgroundColor: `$table_default_header_backgroundColor`
  },
  headerColumnText: {
    ...fontMaker(),
    fontSize: '0.8rem',
    color: `$table_default_header_textColor`,
    textAlign: 'center',
    paddingVertical: 10
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10
  },
  rowOdd: {
    backgroundColor: `$table_default_rowOdd_backgroundColor`
  },
  rowEven: {
    backgroundColor: `$table_default_rowEven_backgroundColor`
  },
  column: {
    flex: 1
  },
  columnText: {
    ...fontMaker(),
    fontSize: '1rem',
    color: `$table_default_column_textColor`,
    textAlign: 'center'
  },
  sortIconText: {
    ...fontMaker(),
    fontSize: '1rem',
    color: '#999',
    marginLeft: 10
  }
})
