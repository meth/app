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

  /* account cards */

  cardsScrollView: {
    flex: 0,
    width: '100%',
    marginTop: 10
  },
  cardsContent: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },

  /* card */

  walletCardButton_active: {
    borderWidth: 1,
    borderRadius: 0,
    borderBottomWidth: 0
  },
  walletCardButton_inactive: {
    borderWidth: 1,
    borderRadius: 0,
    borderBottomColor: '$button_walletCard_enabled_hover_borderColor'
  },
  card: { ...card },

  /* tokens */

  tokenTable: {
    flex: 1,
    marginTop: 10,
    width: '100%',
    alignItems: 'stretch',
    paddingBottom: 10
  }
})
