import { create, fontMaker } from '../../styles'

export default create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  text: {
    flex: 1,
    ...fontMaker()
  },
  button: {
    flex: 0,
    marginLeft: 5,
    borderWidth: 0,
    paddingVertical: 2,
    paddingHorizontal: 3
  }
})
