import { create } from '../../../styles'
import { TAB_HEIGHT } from '../Tab/styles'

export default create({
  tabs: {
    flex: 0,
    height: TAB_HEIGHT * 0.84,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    paddingLeft: 5
  }
})
