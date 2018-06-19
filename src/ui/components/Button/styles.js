import _ from 'lodash'
import { create, fontMaker, value } from '../../styles'

const box = {
  borderWidth: 1,
  borderRadius: 5,
  paddingVertical: 10,
  paddingHorizontal: 10
}

const text = {
  ...fontMaker({ weight: 'SemiBold' }),
  fontSize: '0.8rem',
  textAlign: 'center'
}

export default _.memoize(({ type = 'default', disabled, buttonState = 'default' }) => {
  const subtype = `${type}_${disabled ? 'disabled' : 'enabled'}`

  return create({
    // $outline: 1,
    box: {
      ...box,
      borderColor: `$button_${subtype}_${buttonState}_borderColor`,
      backgroundColor: `$button_${subtype}_${buttonState}_backgroundColor`,
      opacity: () => value(`$button_${subtype}_${buttonState}_opacity`, 1)
    },
    text: {
      ...text,
      color: `$button_${subtype}_${buttonState}_textColor`,
      opacity: () => value(`$button_${subtype}_${buttonState}_opacity`, 1)
    }
  })
})
