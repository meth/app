import { create, fontMaker } from '../../../styles'

export default ({ type }) => create({
  overlay: {
    backgroundColor: '$modal_alert_overlay_backgroundColor'
  },
  content: {
    padding: 30,
    backgroundColor: `$alert_${type}_backgroundColor`,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: 400,
    height: 'auto'
  },
  text: {
    ...fontMaker(),
    fontSize: '1.5rem',
    textAlign: 'center',
    color: `$alert_${type}_textColor`
  }
})
