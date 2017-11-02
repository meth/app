import _ from 'lodash'
import { create, fontMaker } from '../../styles'

const box = {
  borderWidth: 1,
  borderRadius: 5,
  paddingVertical: 10,
  paddingHorizontal: 10
}

const text = {
  ...fontMaker(),
  fontSize: '0.8rem',
  textAlign: 'center'
}

export default _.memoize(({ type = 'default', disabled, hovering = false }) => {
  const subtype = `${type}_${disabled ? 'disabled' : 'enabled'}`
  const state = hovering ? 'hover' : 'default'

  return create({
    // $outline: 1,
    box: {
      ...box,
      borderColor: `$button_${subtype}_${state}_borderColor`,
      backgroundColor: `$button_${subtype}_${state}_backgroundColor`
    },
    text: {
      ...text,
      color: `$button_${subtype}_${state}_textColor`
    }
  })
})
