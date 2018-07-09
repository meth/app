import { ETH, DEFAULT_GAS_LIMIT } from '../../../../../common/constants/protocol'
import { toInt, toFloat, weiToEthBigNum, weiToGweiBigNum, hexStrToBigNum, hexStrToNumber, toDecStr, calculateGasCostInWeiBigNum, ethToWeiBigNum } from '../../../../utils/number'

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


const _sanitizedAmount = value => {
  if (!value) {
    return 0
  }

  try {
    return weiToEthBigNum(hexStrToBigNum(value))
  } catch (err) {
    return 0
  }
}

const _sanitizedGasLimit = value => {
  if (!value) {
    return DEFAULT_GAS_LIMIT
  }

  try {
    return hexStrToNumber(value)
  } catch (err) {
    return DEFAULT_GAS_LIMIT
  }
}

const _sanitizedGasPrice = (value, lastGasPrice) => {
  if (!value) {
    return lastGasPrice
  }

  try {
    return weiToGweiBigNum(hexStrToBigNum(value)).toNumber()
  } catch (err) {
    return lastGasPrice
  }
}

export const getInitialParams = (tx, lastGasPrice) => {
  const { from, to, value, gas: gasLimit, gasPrice, data } = tx

  return {
    from,
    to,
    amount: toDecStr(_sanitizedAmount(value)),
    data,
    unit: ETH,
    gasLimit: toDecStr(_sanitizedGasLimit(gasLimit)),
    gasPrice: toDecStr(_sanitizedGasPrice(gasPrice, lastGasPrice)),
    isContractCreation: (!to && !!data)
  }
}
