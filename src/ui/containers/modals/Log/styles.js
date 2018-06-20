import { create, fontMaker, perHeight } from '../../../styles'

const text = {
  ...fontMaker()
}

export default create({
  content: {
    height: perHeight(500, 500, '90%')
  },
  contentScrollContainer: {
    // $outline: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'stretch'
  },
  alert: {
    width: '95%',
    marginBottom: 20,
    backgroundColor: '$log_alert_backgroundColor',
    padding: 10,
    borderRadius: 5
  },
  alertText: {
    ...text,
    color: '$log_alert_textColor',
    fontSize: '1.2rem'
  },
  alertMetaText: {
    ...text,
    marginTop: 5,
    color: '$log_alert_metaTextColor',
    fontSize: '0.8rem'
  }
})
