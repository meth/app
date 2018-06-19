import { create, fontMaker } from '../../../styles'

export default create({
  scrollView: {
    height: '100%'
  },
  scrollContent: {
    height: '100%'
  },
  container: {
    height: '100%',
    flexDirection: 'column',
    alignItems: 'stretch',
    justifyContent: 'space-between'
  },
  topItems: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'stretch'
  },
  bottomItems: {
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'stretch'
  },
  button: {
    borderRadius: 0,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  buttonText: {
    ...fontMaker({ weight: 'Normal' }),
    textAlign: 'left'
  },
  networkButtonLoadingSpinner: {
    marginLeft: 5
  }
})
