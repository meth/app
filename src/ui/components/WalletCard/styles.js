import { create, fontMaker } from '../../styles'

const text = {
  ...fontMaker()
}

export default create({
  container: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  text: {
    ...fontMaker(),
    marginLeft: 5
  }
})
