import { create } from '../../styles'

export default create({
  container: {
    backgroundColor: '$browser_tabBar_backgroundColor',
  },
  tabs: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
  },
  tab: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '$browser_tabBar_tab_inactive_borderColor',
    backgroundColor: '$browser_tabBar_tab_inactive_backgroundColor',
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  activeTab: {
    borderBottomWidth: 0,
    borderColor: '$browser_tabBar_tab_active_borderColor',
    backgroundColor: '$browser_tabBar_tab_active_backgroundColor',
  }
})
