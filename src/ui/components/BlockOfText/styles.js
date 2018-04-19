import { create, fontMaker } from '../../styles'

export default create({
  scrollView: {
    padding: 5,
    backgroundColor: '$blockOfText_backgroundColor'
  },
  text: {
    ...fontMaker(),
    fontSize: '1rem',
    color: '$blockOfText_textColor',
    flexWrap: 'wrap'
  }
})
