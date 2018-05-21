import { create, whenWidthSmall } from '../../../styles'

export default create({
  // $outline: 1,
  layoutContent: {
    flex: 1,
    backgroundColor: '$content_backgroundColor',
    borderTopWidth: 1,
    borderTopColor: '$content_borderTop_color',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    height: '100%'
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
