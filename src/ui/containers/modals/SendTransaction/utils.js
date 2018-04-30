import { ETH } from '../../../../../common/constants/protocol'
import { toInt, toFloat, weiToEthStr, calculateTotalGasBN, ethToWeiBN } from '../../../../utils/number'

export const getMaxCost = ({ gasLimit, gasPrice, unit, amount }) => {
  const parsedGasLimit = toInt(gasLimit)
  const parsedGasPrice = toInt(gasPrice)
  if (!parsedGasLimit || !parsedGasPrice) {
    return ''
  }

  let totalWei = calculateTotalGasBN(gasLimit, gasPrice)

  // if transferring ETH
  const parsedAmount = toFloat(amount)
  if (ETH === unit && parsedAmount) {
    totalWei = totalWei.add(ethToWeiBN(parsedAmount))
  }

  return weiToEthStr(totalWei)
}
