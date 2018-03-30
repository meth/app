import { create, fontMaker } from '../../styles'

export default create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  text: {
    ...fontMaker(),
    marginLeft: 5
  }
})
