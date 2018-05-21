import { create, fontMaker, whenWidthVerySmall } from '../../../styles'

export default ({ type }) => create({
  overlay: {
    backgroundColor: '$modal_alert_overlay_backgroundColor'
  },
  content: {
    padding: 30,
    backgroundColor: `$alert_${type}_backgroundColor`,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  text: {
    ...fontMaker(),
    fontSize: '1.5rem',
    textAlign: 'left',
    color: `$alert_${type}_textColor`,
    marginLeft: 30
  },
  icon: {
    fontSize: '2rem',
    color: `$alert_${type}_textColor`
  },

  ...whenWidthVerySmall({
    text: {
      fontSize: '1.2rem'
    },
    icon: {
      fontSize: '1.5rem'
    }
  })
})
