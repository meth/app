import { create } from '../../styles'

export default create({
  container: {
    backgroundColor: '$browser_tabBar_tab_active_backgroundColor',
  },
  navBar: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  navIconButton: {
    flex: 0,
  },
  navUrlInput: {
    flex: 1,
  },
})
