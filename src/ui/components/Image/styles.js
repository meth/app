import { create, coverParent } from '../../styles'

export default create({
  loading: {
    ...coverParent,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center'
  }
})
