import _ from 'lodash'
import { create, fontMaker } from '../../styles'

export default _.memoize(({ type = 'default', disabled }) => {
  const subtype = `${type}_${disabled ? 'disabled' : 'enabled'}`

  return create({
    icon: {
      ...fontMaker(),
      fontSize: '0.8rem',
      textAlign: 'center',
      color: `$button_${subtype}_textColor`
    }
  })
})
