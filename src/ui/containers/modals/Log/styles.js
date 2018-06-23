import { create, fontMaker, perHeight, perWidth } from '../../../styles'

const alertText = {
  ...fontMaker(),
  color: '$log_alert_textColor'
}

const alertMetaText = {
  ...fontMaker(),
  marginTop: 5,
  color: '$log_alert_metaTextColor'
}


export default create({
  content: {
    width: perWidth(500, '90%'),
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
    ...alertText,
    fontSize: '1.2rem'
  },
  alertMetaText: {
    ...alertMetaText,
    fontSize: '0.8rem'
  },
  newAlertText: {
    ...alertText,
    fontSize: '1.5rem'
  },
  newAlertMetaText: {
    ...alertMetaText,
    fontSize: '1.1rem'
  }
})
