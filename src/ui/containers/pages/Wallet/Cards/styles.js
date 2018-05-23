import { create } from '../../../../styles'

const card = {
  width: 250,
  height: 230
}

export default create({
  container: {
    justifyContent: 'center',
    alignItems: 'stretch'
  },
  cardButton_active: {
    borderRadius: 0,
    borderColor: '$button_walletCard_enabled_hover_borderColor'
  },
  cardButton_inactive: {
    borderRadius: 0
  },
  card: {
    ...card
  },
  addAccountButton: {
    ...card,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  addAccountButtonIcon: {
    fontSize: '3rem'
  }
})
