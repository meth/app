import { create, coverParent } from '../../styles'

export default create({
  loading: {
    ...coverParent,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center'
  },
  image: {
    flex: 1,
    width: '100%',
    height: 'auto'
  }
})
