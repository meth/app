import _ from 'lodash'
import { create, fontMaker } from '../../styles'

export default _.memoize(type => create({
  container: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    margin: 0,
    backgroundColor: `$alert_${type}_backgroundColor`,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  icon: {
    width: '1.5rem',
    fontSize: '1.5rem',
    color: `$alert_${type}_textColor`,
    marginRight: 10
  },
  text: {
    flex: 1,
    ...fontMaker(),
    fontSize: '0.8rem',
    color: `$alert_${type}_textColor`
  }
}))
