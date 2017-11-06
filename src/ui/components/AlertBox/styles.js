import _ from 'lodash'
import { create } from '../../styles'

export default _.memoize(type => create({
  container: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    margin: 0,
    backgroundColor: `$alert_${type}_backgroundColor`,
    borderRadius: 10
  },
  text: {
    fontSize: '0.8rem',
    textAlign: 'center',
    color: `$alert_${type}_textColor`
  }
}))
