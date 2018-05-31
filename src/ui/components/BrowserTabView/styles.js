import { create } from '../../styles'

export default create({
  container: {
    backgroundColor: '$browser_tabBar_tab_active_backgroundColor',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    width: '100%',
    height: '100%'
  },
  navBar: {
    flex: 0,
    paddingVertical: 10,
    paddingHorizontal: 5,
    borderBottomWidth: 1,
    borderColor: '$browser_navBar_borderBottomColor',
    backgroundColor: '$browser_navBar_backgroundColor',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'stretch',
    position: 'relative'
  },
  webView: {
    flex: 1
  }
})
