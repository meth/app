import { toBN, fromWei } from 'web3-utils'

export { hexToNumber, toHex } from 'web3-utils'

export const isNumber = val => 'number' === typeof val && `${val}` !== 'NaN'

export const addCommas = value => {
  if (null === value) {
    return null
  }

  const strValue = String(value)
  const fracStartPos = strValue.indexOf('.')
  const fraction = 0 <= fracStartPos ? strValue.substr(fracStartPos + 1) : ''
  const sig = 0 <= fracStartPos ? strValue.substr(0, fracStartPos) : strValue

  let str = ''
  let numbersAdded = 0

  for (let i = sig.length - 1; 0 <= i; i -= 1) {
    if (numbersAdded && numbersAdded % 3 === 0) {
      str = `,${str}`
    }
    str = sig.charAt(i) + str
    numbersAdded += 1
  }

  str += fraction.length && Number(fraction) ? `.${fraction}` : ''

  return str
}

export const toDecimalPlaces = (
  value,
  decimals = undefined,
  { showCommas = true } = {}
) => {
  if (null === value) {
    return null
  }

  let finalValue = Number(value)

  if (null !== decimals && 0 <= decimals) {
    // only want to show as many decimal places as are needed
    let curValue = finalValue
    for (let i = 0; i <= decimals; i += 1) {
      if (0 < i) {
        curValue *= 10
      }

      if (curValue % 1 === 0 || decimals === i) {
        finalValue = finalValue.toFixed(i)

        break
      }
    }
  } else {
    finalValue = `${finalValue}`
  }

  return showCommas ? addCommas(finalValue) : finalValue
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

export const hexToBN = hex => toBN(hex)
export const numToBN = num => toBN(num)

const getPowerOfTenBN = power => numToBN(10).pow(numToBN(power))

const _strPrefix = ({ hex } = {}) => (hex ? '0x' : '')
const _strBase = ({ hex } = {}) => (hex ? 16 : 10)

export const toTokenBalanceStr = (balance, decimals, options) =>
  _strPrefix(options) + numToBN(balance).div(getPowerOfTenBN(decimals)).toString(_strBase(options))

export const tokenBalanceToWeiStr = (balance, decimals, options) =>
  _strPrefix(options) + numToBN(balance).mul(getPowerOfTenBN(decimals)).toString(_strBase(options))

export const weiToEthStr = balance => fromWei(balance, 'ether')

export const ethToWeiBN = balance => {
  // since BN.js does not support decimals we manually convert from ETH to WEI
  const str = `${balance}`
  let dotPos = str.indexOf('.')
  if (0 > dotPos) {
    dotPos = str.length - 1
  }
  return numToBN(
    str.replace('.', '') + '0'.repeat(18 - (str.length - dotPos - 1))
  )
}

export const ethToWeiStr = (balance, options) =>
  _strPrefix(options) + ethToWeiBN(balance).toString(_strBase(options))

export const gweiToWeiStr = balance =>
  numToBN(balance).toString(10) + '0'.repeat(9)

export const calculateTotalGasBN = (gasLimit, gasPriceInGwei) =>
  numToBN(gasPriceInGwei).mul(getPowerOfTenBN(9)).mul(numToBN(gasLimit))
