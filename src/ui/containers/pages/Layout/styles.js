import { create, fontMaker } from '../../../styles'

const textStyles = {
  ...fontMaker(),
  color: '$header_textColor',
  fontSize: '0.8rem'
}

export default create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'stretch'
  },

  /* header */

  header: {
    flex: 0,
    backgroundColor: '$header_backgroundColor',
    height: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  headerLeft: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  headerRight: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  headerAppNameText: {
    ...textStyles
  },
  headerBalanceText: {
    ...textStyles
  },
  headerConnectionText: {
    ...textStyles
  },

  /* content */

  content: {
    flex: 1,
    backgroundColor: '$content_backgroundColor',
    padding: 20
  }
})
