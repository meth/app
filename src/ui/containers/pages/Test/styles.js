import { create, fontMaker } from '../../../styles'

const text = {
  ...fontMaker(),
  fontSize: '1rem',
  textAlign: 'center',
  color: '$content_textColor'
}

export default create({
  layoutContent: {
    backgroundColor: '$content_backgroundColor',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'stretch'
  },
  tabBar: {
    flex: 1,
    height: 30,
    backgroundColor: '#000',
    shadowOpacity: 0
  },
  tab: {
    backgroundColor: '#000',
    paddingVertical: 0
  },
  indicator: {
    backgroundColor: '#333'
  },
  label: {
    ...text,
    fontSize: '0.5rem'
  },
  tabContentText: {
    ...text
  }
})
