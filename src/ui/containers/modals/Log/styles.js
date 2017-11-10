import { create, fontMaker } from '../../../styles'

const text = {
  ...fontMaker()
}

export default create({
  overlay: {
    backgroundColor: '$modal_log_overlay_backgroundColor'
  },
  scrollContainer: {
    flex: 0,
    padding: 20,
    backgroundColor: '$modal_content_backgroundColor',
    borderRadius: 10,
    width: '90%',
    height: '90%'
  },
  closeButton: {
    position: 'absolute',
    top: 25,
    right: 25,
    borderRadius: 40
  },
  scrollContent: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  appLogText: {
    ...text,
    fontSize: '1rem',
    textAlign: 'center',
    color: `$modal_content_textColor`,
    marginBottom: 15
  },
  unseenAlert: {
    width: '95%',
    marginBottom: 20,
    backgroundColor: '$log_unseenAlert_backgroundColor',
    padding: 10,
    borderRadius: 5
  },
  unseenAlertText: {
    ...text,
    color: '$log_unseenAlert_textColor',
    fontSize: '1.2rem'
  },
  unseenAlertMetaText: {
    ...text,
    marginTop: 5,
    color: '$log_unseenAlert_metaTextColor',
    fontSize: '0.8rem'
  },

  /* log */

  event: {
    width: '95%',
    marginBottom: 2,
    borderRadius: 2,
    padding: 3,
    backgroundColor: '$log_event_backgroundColor',
    justifyContent: 'space-around',
    alignItems: 'flex-start'
  },
  eventMeta: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 5
  },
  eventLevelText: {
    ...text,
    marginBottom: 2
  },
  eventMsgText: {
    ...text,
    color: '$log_event_textColor'
  },
  eventMetaText: {
    ...text,
    fontSize: '0.5rem',
    color: '$log_event_metaTextColor',
    marginRight: 10
  },
  warn: {
    color: '$log_event_warnColor'
  },
  error: {
    color: '$log_event_errorColor'
  },
  alert: {
    color: '$log_event_alertColor'
  }
})
