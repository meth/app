import { create, fontMaker } from '../../styles'

const tabText = {
  ...fontMaker({ weight: 'Light' }),
  borderRadius: 20,
  paddingVertical: 5,
  paddingHorizontal: 20
}

export default create({
  // $outline: 1,
  container: {
    height: 'auto',
    width: '100%'
  },
  tabsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '$wallet_tabBar_backgroundColor'
  },
  tabText: {
    ...tabText,
    fontSize: '0.8rem',
    color: '$wallet_tabBar_item_inactive_textColor',
    backgroundColor: '$wallet_tabBar_item_inactive_backgroundColor'
  },
  selectedTabText: {
    ...tabText,
    fontSize: '0.8rem',
    color: '$wallet_tabBar_item_active_textColor',
    backgroundColor: '$wallet_tabBar_item_active_backgroundColor'
  }
})
