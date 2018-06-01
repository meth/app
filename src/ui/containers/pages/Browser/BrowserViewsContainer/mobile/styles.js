import { create, coverParent, getWindowDimensions } from '../../../../../styles'

const { width, height } = getWindowDimensions()

export default create({
  coverFlowContainer: {
    flex: 0,
    height: '100%',
    backgroundColor: '$browser_coverFlow_backgroundColor',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    paddingTop: 50,
    position: 'relative'
  },
  coverFlow: {
    backgroundColor: '$browser_coverFlow_backgroundColor'
  },
  card: {
    position: 'relative',
    width: width * 0.5,
    minHeight: height * 0.5
  },
  cardBlockingOverlay: {
    ...coverParent
  },
  tabsButtonContainer: {
    marginLeft: 5
  },
  tabsButton: {
  },
  cardsNav: {
    position: 'absolute',
    bottom: 40,
    left: '10%',
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  closeButton: {
    width: 40,
    height: 36,
    marginBottom: 50,
    borderRadius: 40
  },
  navDots: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap'
  },
  navDot: {
    width: 5,
    height: 5,
    margin: 5,
    borderRadius: 5,
    backgroundColor: '$browser_coverFlow_navDot_default_backgroundColor'
  },
  activeNavDot: {
    backgroundColor: '$browser_coverFlow_navDot_active_backgroundColor'
  }
})
