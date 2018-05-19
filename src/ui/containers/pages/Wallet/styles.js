import { create } from '../../../styles'

export default create({
  // $outline: 1,

  layoutContent: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start'
  },
  topLevelLoading: {
    flex: 1,
    alignSelf: 'center'
  },

  /* tokens */

  tokenTable: {
    flex: 1,
    marginTop: 10,
    width: '100%',
    alignItems: 'stretch',
    paddingBottom: 10
  }
})
