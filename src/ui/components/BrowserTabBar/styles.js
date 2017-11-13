import { create } from '../../styles'

export default create({
  container: {
    backgroundColor: '$browser_tabBar_backgroundColor',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'stretch'
  },
  plusButton: {
    alignSelf: 'flex-end',
    borderRadius: 40,
    paddingVertical: 3,
    paddingHorizontal: 5,
    marginLeft: 10,
    marginBottom: 5
  }
})
