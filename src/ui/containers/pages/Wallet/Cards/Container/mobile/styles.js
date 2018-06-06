import { create, getWindowDimensions } from '../../../../../../styles'

const navDot = {
  flex: 0,
  width: 10,
  height: 10,
  borderRadius: 10,
  marginHorizontal: 5
}

export default create({
  swiper: {
    flex: 1,
    backgroundColor: '$wallet_swiper_backgroundColor'
  },
  nav: {
    marginTop: -10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  inactiveNavDot: {
    ...navDot,
    backgroundColor: '$wallet_swiper_navDot_inactive_backgroundColor'
  },
  activeNavDot: {
    ...navDot,
    backgroundColor: '$wallet_swiper_navDot_active_backgroundColor'
  },
  card: {
    width: getWindowDimensions().width,
    height: '100%',
    paddingTop: 10,
    paddingBottom: 20,
    paddingHorizontal: '10%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'stretch'
  }
})
