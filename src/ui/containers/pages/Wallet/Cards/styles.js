import { create, dropShadower } from '../../../../styles'
import { isIos, isAndroid } from '../../../../../utils/deviceInfo'

const card = {
  width: 250,
  height: 230
}

const cardButton = ((isIos || isAndroid) ? {
  ...dropShadower(2)
} : {})


export default create({
  container: {
    justifyContent: 'center',
    alignItems: 'stretch'
  },
  cardButton_active: {
    ...cardButton,
    borderRadius: 0,
    borderColor: '$button_walletCard_enabled_hover_borderColor'
  },
  cardButton_inactive: {
    ...cardButton,
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
