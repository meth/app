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
    paddingVertical: 10,
    paddingHorizontal: 5,
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
    flex: 1,
    marginHorizontal: 5
  },
  webView: {
    flex: 1
  }
})
