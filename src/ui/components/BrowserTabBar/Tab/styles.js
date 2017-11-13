import { create, coverParent } from '../../../styles'

export const TAB_WIDTH = 150
export const TAB_HEIGHT = 45

export default create({
  tab: {
    position: 'relative',
    width: TAB_WIDTH,
    height: TAB_HEIGHT,
    alignItems: 'center',
    justifyContent: 'center'
  },
  activeTab: {
    zIndex: 3
  },
  bg: {
    ...coverParent,
    borderWidth: 1,
    borderColor: '$browser_tabBar_tab_inactive_borderColor',
    backgroundColor: '$browser_tabBar_tab_inactive_backgroundColor',
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    transform: [ { perspective: 500 }, { rotateX: '40deg' } ]
  },
  activeBg: {
    borderBottomWidth: 0,
    borderColor: '$browser_tabBar_tab_active_borderColor',
    backgroundColor: '$browser_tabBar_tab_active_backgroundColor'
  },
  content: {
    width: TAB_WIDTH,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  leftContent: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingLeft: 10,
    maxWidth: '60%',
    overflow: 'hidden'
  },
  rightContent: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingRight: 5
  },
  status: {
    marginRight: 10
  }
})
