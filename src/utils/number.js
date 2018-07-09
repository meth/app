import _ from 'lodash'
import BigNumber from 'bignumber.js'

BigNumber.config({
  FORMAT: {
    decimalSeparator: '.',
    groupSeparator: ',',
    groupSize: 3,
    secondaryGroupSize: 0,
    fractionGroupSeparator: ' ',
    fractionGroupSize: 0
  }
})

export const isNumber = val => 'number' === typeof val && `${val}` !== 'NaN'

export const toBigNum = (num, base = 10) => new BigNumber(num, base)

export const hexStrToNumber = num => toBigNum(num, 16).toNumber()
export const hexStrToBigNum = num => toBigNum(num, 16)
export const toHexStr = num => `0x${toBigNum(num).toString(16)}`
export const toDecStr = num => toBigNum(num).toString(10)
export const toFormattedDecStr = (
  num,
  decimals = undefined,
  { showCommas = true } = {}
) => {
  let str = showCommas
    ? toBigNum(num).toFormat(decimals)
    : toBigNum.toFixed(decimals)

  // remove excess 0's from the end
  while (
    0 <= str.indexOf('.') &&
    ('0' === str.charAt(str.length - 1) || '.' === str.charAt(str.length - 1))
  ) {
    str = str.substr(0, str.length - 1)
  }

  return str
}

export const toFloat = num => {
  const n = parseFloat(`${num}`, 10)
  if (Number.isNaN(n)) {
    return null
  }
  return n
}
export const toFloatStr = num => {
  const n = toFloat(num)
  return null === n ? '' : `${n}`
}

export const toInt = num => {
  const n = parseInt(`${num}`, 10)
  if (Number.isNaN(n)) {
    return null
  }
  return n
}
export const toIntStr = num => {
  const n = toInt(num)
  return null === n ? '' : `${n}`
}

const powerOfTenBigNum = _.memoize(power => toBigNum(10).pow(power))

export const toTokenRawBalanceBigNum = (amount, decimals) =>
  toBigNum(amount).times(powerOfTenBigNum(decimals))

export const toTokenFriendlyBalanceBigNum = (amount, decimals) =>
  toBigNum(amount).div(powerOfTenBigNum(decimals))

export const weiToEthBigNum = balance =>
  toBigNum(balance).div(powerOfTenBigNum(18))

export const ethToWeiBigNum = balance =>
  toBigNum(balance).times(powerOfTenBigNum(18))

export const gweiToWeiBigNum = balance =>
  toBigNum(balance).times(powerOfTenBigNum(9))

export const weiToGweiBigNum = balance =>
  toBigNum(balance).div(powerOfTenBigNum(9))

export const calculateGasCostInWeiBigNum = (gasLimit, gasPriceInGwei) =>
  toBigNum(gasPriceInGwei).times(powerOfTenBigNum(9)).times(gasLimit)

export const getTotalAccountsBalanceAsStr = accounts => {
  const totalWeiBigNum = Object.values(accounts).reduce(
    (m, { balance }) => m.plus(balance),
    toBigNum(0)
  )

  return `Ξ ${toFormattedDecStr(weiToEthBigNum(totalWeiBigNum), 1)}`
}
