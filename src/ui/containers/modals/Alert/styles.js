import { create, fontMaker, perWidth } from '../../../styles'

export default ({ type }) => create({
  overlay: {
    backgroundColor: '$modal_alert_overlay_backgroundColor'
  },
  content: {
    padding: 30,
    backgroundColor: `$alert_${type}_backgroundColor`
  },
  scrollContainerContent: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  text: {
    ...fontMaker(),
    fontSize: perWidth('1.5rem', '1.5rem', '1.2rem'),
    textAlign: 'left',
    color: `$alert_${type}_textColor`,
    marginLeft: 30
  },
  icon: {
    fontSize: perWidth('2rem', '2rem', '1.5rem'),
    color: `$alert_${type}_textColor`
  }
})
