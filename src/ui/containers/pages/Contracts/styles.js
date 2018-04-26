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

  ...whenWidthSmall({
    layoutContent: {
      alignItems: 'center',
      width: '95%'
    }
  })
})
