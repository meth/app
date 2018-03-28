import { create, fontMaker } from '../../../styles'

export default create({
  layoutContent: {
    backgroundColor: '$content_backgroundColor',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    ...fontMaker(),
    fontSize: '1rem',
    textAlign: 'center',
    color: '$content_textColor',
    maxWidth: '70%'
  }
})
