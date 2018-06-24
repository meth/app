import { ETH } from '../../../../../common/constants/protocol'
import { toInt, toFloat, weiToEthBigNum, toDecStr, calculateGasCostInWeiBigNum, ethToWeiBigNum } from '../../../../utils/number'

const _getMaxCostInWeiBigNum = ({ gasLimit, gasPrice, unit, amount }) => {
  const parsedGasLimit = toInt(gasLimit)
  const parsedGasPrice = toInt(gasPrice)
  if (!parsedGasLimit || !parsedGasPrice) {
    return ''
  }

  // calculate gas cost in WEI
  let totalWeiBigNum = calculateGasCostInWeiBigNum(gasLimit, gasPrice)

  // if transferring ETH then add that to the cost
  if (ETH === unit) {
    const parsedAmount = toFloat(amount)

    if (parsedAmount) {
      totalWeiBigNum = totalWeiBigNum.plus(ethToWeiBigNum(parsedAmount))
    }
  }

  return totalWeiBigNum
}

export const recalculateAmountBasedOnMaxCostAndAvailableBalance =
  ({ gasLimit, gasPrice, unit, amount }, balanceEth) => {
    try {
      const maxWeiBigNum = _getMaxCostInWeiBigNum({ gasLimit, gasPrice, unit, amount })
      const balanceWeiBigNum = ethToWeiBigNum(balanceEth)

      // if need more balance than is available
      const parsedAmount = toFloat(amount)
      if (parsedAmount && maxWeiBigNum.gt(balanceWeiBigNum)) {
        let amountWeiBigNum = ethToWeiBigNum(parsedAmount)

        // reduce amount until we have enough to complete the transaction
        amountWeiBigNum = amountWeiBigNum.minus(maxWeiBigNum.minus(balanceWeiBigNum))

        if (amountWeiBigNum.gte(0)) {
          return toDecStr(weiToEthBigNum(amountWeiBigNum))
        }

        return '0'
      }
    } catch (err) {
      // fall through to default
    }

    return amount
  }

export const getMaxCostEthWithSuffixStr = ({ gasLimit, gasPrice, unit, amount }) => {
  const cost = toDecStr(
    weiToEthBigNum(_getMaxCostInWeiBigNum({ gasLimit, gasPrice, unit, amount }))
  )

  return ('NaN' === cost ? '-' : `${cost} ${ETH}`)
}
