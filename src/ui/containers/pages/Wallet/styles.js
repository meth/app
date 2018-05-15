import { create } from '../../../styles'

const card = {
  width: 250,
  minHeight: 250
}

export default create({
  // $outline: 1,

  layoutContent: {
    backgroundColor: '$content_backgroundColor',
    borderTopWidth: 1,
    borderTopColor: '$content_borderTop_color',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingTop: 10,
    paddingBottom: 0,
    height: '95%'
  },
  topLevelLoading: {
    alignSelf: 'center'
  },

  /* cards scroller */

  cardsScrollView: {
    position: 'relative',
    flex: 0,
    width: '100%'
  },
  cardsContent: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },

  /* card */

  walletCardButton_active: {
    borderWidth: 2,
    borderRadius: 0,
    borderColor: '$button_walletCard_enabled_hover_borderColor',
    borderBottomColor: '$wallet_card_active_borderBottomColor'
  },
  walletCardButton_inactive: {
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
  },

  /* tokens */

  tokenTable: {
    flex: 1,
    marginTop: 10,
    width: '100%',
    alignItems: 'stretch',
    paddingBottom: 10
  }
})
