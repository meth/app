import { create, fontMaker } from '../../styles'

const text = {
  ...fontMaker(),
  textAlign: 'center'
}

export default create({
  tabBar: {
    height: 30,
    backgroundColor: '$tabView_backgroundColor',
    shadowOpacity: 0,
    marginBottom: 20
  },
  tab: {
    backgroundColor: '$tabView_tab_backgroundColor',
    paddingVertical: 0
  },
  indicator: {
    backgroundColor: '$tabView_indicatorColor'
  },
  label: {
    ...text,
    fontSize: '0.5rem',
    color: '$tabView_label_textColor'
  }
})
