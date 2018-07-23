import { create, dropShadower } from '../../../../styles'
import { getWalletCardHeight } from '../../../../styles/cards'
import { isIos, isAndroid, isWeb } from '../../../../../utils/deviceInfo'

const card = {
  width: 250,
  height: getWalletCardHeight()
}

const cardButton = {
  borderRadius: 0,
  ...((isIos() || isAndroid()) ? {
    ...dropShadower(2)
  } : {})
}


export default create({
  container: {
    justifyContent: 'center',
    alignItems: 'stretch'
  },
  cardButton_active: {
    ...cardButton,
    borderColor: '$button_walletCard_enabled_hover_borderColor',
    ...(isWeb() ? { borderBottomWidth: 0 } : {})
  },
  cardButton_inactive: {
    ...cardButton,
    ...(isWeb() ? {
      borderBottomColor: '$button_walletCard_enabled_hover_borderColor'
    } : {})
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
    fontSize: '2rem',
    backgroundColor: '$button_default_enabled_default_backgroundColor',
    borderRadius: 10,
    color: '$button_default_enabled_default_textColor',
    padding: 10
  }
})
