import { create } from '../../../styles'
import { getWalletViewCardSwiperFlex } from '../../../styles/cards'
import commonStyles from './styles.common'

commonStyles.cards.flex = getWalletViewCardSwiperFlex()
commonStyles.tokenTable.flex = 1 - commonStyles.cards.flex
commonStyles.addAccountAlertBoxContainer.flex = commonStyles.tokenTable.flex

export default create(commonStyles)
