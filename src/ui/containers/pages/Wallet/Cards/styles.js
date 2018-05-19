import { create } from '../../../../styles'

const card = {
  width: 250,
  minHeight: 250
}

export default create({
  /* cards scroller */
  scrollView: {
    flex: 0,
    width: '100%'
  },
  scrollViewContent: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },

  /* card */

  cardButton_active: {
    borderWidth: 2,
    borderRadius: 0,
    borderColor: '$button_walletCard_enabled_hover_borderColor',
    borderBottomColor: '$wallet_card_active_borderBottomColor'
  },
  cardButton_inactive: {
    borderWidth: 1,
    borderRadius: 0,
    borderBottomColor: '$wallet_card_inactive_borderBottomColor'
  },
  card: { ...card },
  addAccountButton: {
    ...card,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%'
  },
  addAccountButtonIcon: {
    fontSize: '2rem'
  }
})
