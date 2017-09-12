import _ from 'lodash'
import { create, fontMaker } from '../../styles'

export default _.memoize(({ type = 'default', disabled }) => {
  const subtype = `${type}_${disabled ? 'disabled' : 'enabled'}`

  return create({
    // $outline: 1,
    box: {
      borderWidth: 1,
      borderRadius: 5,
      paddingVertical: 10,
      paddingHorizontal: 10,
      borderColor: `$button_${subtype}_borderColor`,
      backgroundColor: `$button_${subtype}_backgroundColor`
    },
    text: {
      ...fontMaker(),
      fontSize: '0.8rem',
      textAlign: 'center',
      color: `$button_${subtype}_textColor`
    }
  })
})
