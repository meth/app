import _ from 'lodash'
import { create, fontMaker } from '../../styles'

export default _.memoize(({ type = 'default', disabled, hovering = false }) => {
  const subtype = `${type}_${disabled ? 'disabled' : 'enabled'}`
  const state = hovering ? 'hover' : 'default'

  return create({
    icon: {
      ...fontMaker(),
      fontSize: '0.8rem',
      textAlign: 'center',
      color: `$button_${subtype}_${state}_textColor`
    }
  })
})
