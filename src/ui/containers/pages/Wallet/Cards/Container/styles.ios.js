import { create, getWindowDimensions } from '../../../../../styles'

export default create({
  swiper: {
    flex: 1,
    backgroundColor: '$wallet_swiper_backgroundColor'
  },
  nav: {
    bottom: 5
  },
  navDot: {
    backgroundColor: '$wallet_swiper_navDot_inactive_backgroundColor'
  },
  activeNavDot: {
    backgroundColor: '$wallet_swiper_navDot_active_backgroundColor'
  },
  card: {
    width: getWindowDimensions().width,
    height: '100%',
    paddingVertical: 10,
    paddingBottom: 20,
    paddingHorizontal: '10%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'stretch'
  }
})
