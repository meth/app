import { create } from '../../../../styles'

const card = {
  width: 250,
  height: 250
}

export default create({
  container: {
    justifyContent: 'center',
    alignItems: 'stretch'
  },
  cardButton_active: {
    borderWidth: 2,
    borderRadius: 0,
    borderColor: '$button_walletCard_enabled_hover_borderColor'
  },
  cardButton_inactive: {
    borderWidth: 1,
    borderRadius: 0
  },
  card: { ...card },
  addAccountButton: {
    ...card,
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  addAccountButtonIcon: {
    fontSize: '2rem'
  }
})
