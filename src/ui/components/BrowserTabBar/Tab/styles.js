import { create } from '../../../styles'

export default create({
  tab: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '$browser_tabBar_tab_inactive_borderColor',
    backgroundColor: '$browser_tabBar_tab_inactive_backgroundColor',
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    minWidth: 150
    // transform: [{ perspective: 50, rotateX: '40deg' }],
  },
  activeTab: {
    borderBottomWidth: 0,
    borderColor: '$browser_tabBar_tab_active_borderColor',
    backgroundColor: '$browser_tabBar_tab_active_backgroundColor'
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  leftContent: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  rightContent: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  status: {
    marginRight: 10
  }
})
