import { create, fontMaker, whenWidthSmall } from '../../../styles'

const text = {
  ...fontMaker(),
  fontSize: '1rem',
  color: '$content_textColor'
}

export default create({
  layoutContent: {
    // $outline: 1,
    backgroundColor: '$content_backgroundColor',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingTop: 0,
    width: '70%'
  },
  titleBar: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  titleBarText: {
    ...text,
    ...fontMaker({ weight: 'Light' }),
    fontSize: '0.8rem',
    color: '$addressBook_title_textColor',
    textTransform: 'uppercase',
    marginRight: 20
  },
  titleBarAddIcon: {
    fontSize: '0.6rem'
  },
  table: {
    marginTop: 10,
    paddingBottom: 20
  },

  ...whenWidthSmall({
    layoutContent: {
      alignItems: 'center',
      width: '95%'
    }
  })
})
