import { create, coverParent, getWindowDimensions } from '../../../styles'

export const MAX_TAB_WIDTH = 150
export const TAB_HEIGHT = 45
export const CLOSE_BUTTON_SIZE = 30

export default ({ totalTabs }) => {
  const { width } = getWindowDimensions()

  const tabWidth = Math.min(MAX_TAB_WIDTH, (width - (MAX_TAB_WIDTH / 2)) / totalTabs)

  return create({
    tab: {
      position: 'relative',
      width: tabWidth,
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
      width: tabWidth,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    leftContent: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
      paddingLeft: 10,
      maxWidth: Math.max(tabWidth - CLOSE_BUTTON_SIZE, 0),
      overflow: 'hidden'
    },
    rightContent: {
      width: CLOSE_BUTTON_SIZE,
      flexDirection: 'row',
      justifyContent: 'flex-end',
      alignItems: 'center',
      paddingRight: 5,
      overflow: 'hidden'
    },
    status: {
      marginRight: 10
    },
    closeButton: {
      borderRadius: CLOSE_BUTTON_SIZE,
      paddingVertical: 3,
      paddingHorizontal: 5
    },
    tabText: {
      flex: 1,
      textAlign: 'left'
    }
  })
}
