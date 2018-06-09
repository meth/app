import { create, perWidth } from '../../../styles'

export default create({
  content: {
    height: perWidth('auto', '90%')
  },
  scrollContainerContent: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'stretch'
  },
  titleText: {
    marginBottom: 15,
    alignSelf: 'center'
  }
})
