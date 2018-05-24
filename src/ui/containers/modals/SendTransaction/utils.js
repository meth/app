import { ETH } from '../../../../../common/constants/protocol'
import { numToBN, toInt, toFloat, weiToEthStr, calculateTotalGasBN, ethToWeiBN } from '../../../../utils/number'

const _getMaxCostWeiBN = ({ gasLimit, gasPrice, unit, amount }) => {
  const parsedGasLimit = toInt(gasLimit)
  const parsedGasPrice = toInt(gasPrice)
  if (!parsedGasLimit || !parsedGasPrice) {
    return ''
  }

  const totalWeiBN = calculateTotalGasBN(gasLimit, gasPrice)

  // if transferring ETH
  const parsedAmount = toFloat(amount)
  if (ETH === unit && parsedAmount) {
    totalWeiBN.iadd(ethToWeiBN(parsedAmount))
  }

  return totalWeiBN
}

export const recalculateAmountBasedOnMaxCostAndAvailableBalance =
  ({ gasLimit, gasPrice, unit, amount }, balanceEth) => {
    try {
      const maxWeiBN = _getMaxCostWeiBN({ gasLimit, gasPrice, unit, amount })
      const balanceWeiBN = ethToWeiBN(balanceEth)

      // if need more balance than is available
      const parsedAmount = toFloat(amount)
      if (parsedAmount && maxWeiBN.gt(balanceWeiBN)) {
        const amountWeiBN = ethToWeiBN(parsedAmount)

        // reduce amount until we have enough to complete the transaction
        amountWeiBN.isub(maxWeiBN.sub(balanceWeiBN))

        if (amountWeiBN.gte(numToBN(0))) {
          return weiToEthStr(amountWeiBN)
        }

        return '0'
      }
    } catch (err) {
      // fall through to default
    }

    return amount
  }

export const getMaxCostEthWithSuffixStr = ({ gasLimit, gasPrice, unit, amount }) => (
  `${weiToEthStr(_getMaxCostWeiBN({ gasLimit, gasPrice, unit, amount }))} ${ETH}`
)
