import { create, fontMaker } from '../../../../styles'

const text = {
  ...fontMaker()
}

export default create({
  scrollContent: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  event: {
    width: '95%',
    marginBottom: 20,
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
  }
})
