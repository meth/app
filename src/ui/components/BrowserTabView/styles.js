import { create } from '../../styles'

export default create({
  container: {
    flex: 1,
    backgroundColor: '$browser_tabBar_tab_active_backgroundColor',
    justifyContent: 'flex-start',
    alignItems: 'stretch'
  },
  navBar: {
    flex: 0,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '$browser_navBar_borderBottomColor'
  },
  navIconButton: {
    flex: 0
  },
  navUrlInput: {
    flex: 1
  },
  webView: {
    flex: 1
  }
})
