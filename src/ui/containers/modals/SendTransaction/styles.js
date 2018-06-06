import { create, perWidth } from '../../../styles'

export default create({
  content: {
    height: perWidth('height', '90%'),
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'stretch'
  },
  titleText: {
    marginBottom: 15,
    alignSelf: 'center'
  }
})
