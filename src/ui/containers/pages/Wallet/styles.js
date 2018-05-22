import { create } from '../../../styles'

export default create({
  // $outline: 1,

  layoutContent: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start'
  },
  topLevelLoading: {
    flex: 1,
    alignSelf: 'center'
  },

  /* cards */

  cards: {
    flex: 0.5,
    width: '100%'
  },
  addAccountAlertBox: {
    marginTop: 10,
    alignSelf: 'center'
  },

  /* tokens */

  tokenTable: {
    flex: 0.5,
    marginTop: 10,
    width: '100%',
    alignItems: 'stretch',
    paddingBottom: 10
  }
})
