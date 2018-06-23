import { create, perWidth } from '../../../styles'

export default create({
  content: {
    height: perWidth(550, '90%')
  },
  scrollContainerContent: {
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'stretch'
  },
  titleText: {
    marginBottom: 15,
    alignSelf: 'center'
  }
})
