import { create, whenWidthSmall } from '../../../styles'

export default create({
  layoutContent: {
    // $outline: 1,
    backgroundColor: '$content_backgroundColor',
    borderTopWidth: 1,
    borderTopColor: '$content_borderTop_color',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingTop: 10,
    paddingBottom: 0,
    height: '95%'
  },
  table: {
    flex: 1,
    paddingBottom: 20,
    minWidth: '70%'
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
  },

  ...whenWidthSmall({
    layoutContent: {
      alignItems: 'center',
      width: '95%'
    },
    table: {
      width: '100%'
    }
  })
})
