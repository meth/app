import { create, fontMaker } from '../../styles'

export default create({
  container: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start'
  },
  addressText: {
    ...fontMaker({ weight: 'Light' }),
    fontSize: '1rem',
    textAlign: 'left',
    color: '$addressBook_address_textColor'
  },
  label: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  labelText: {
    ...fontMaker(),
    fontSize: '0.7rem',
    textAlign: 'left',
    color: '$addressBook_label_textColor',
    marginRight: 5
  }
})
