import { create, dropShadower } from '../../../../../styles'

export default create({
  cardButton: {
    borderRadius: 0,
    ...dropShadower(2),
    borderColor: '$button_walletCard_enabled_hover_borderColor'
  }
})
