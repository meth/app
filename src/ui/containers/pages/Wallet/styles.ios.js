import { create, perHeight } from '../../../styles'
import commonStyles from './styles.common'

commonStyles.cards.flex = perHeight(0.4, 0.5)
commonStyles.tokenTable.flex = perHeight(0.6, 0.5)

export default create(commonStyles)
