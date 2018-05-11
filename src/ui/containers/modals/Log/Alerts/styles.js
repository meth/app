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
  alert: {
    width: '95%',
    marginBottom: 20,
    backgroundColor: '$log_unseenAlert_backgroundColor',
    padding: 10,
    borderRadius: 5
  },
  alertText: {
    ...text,
    color: '$log_unseenAlert_textColor',
    fontSize: '1.2rem'
  },
  alertMetaText: {
    ...text,
    marginTop: 5,
    color: '$log_unseenAlert_metaTextColor',
    fontSize: '0.8rem'
  }
})
