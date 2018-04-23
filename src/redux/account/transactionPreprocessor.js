import { ETH } from '../../../common/constants/protocol'
import { ethToWeiStr, gweiToWeiStr } from '../../utils/number'
import { getStore } from '../'

export default ({ nodeConnector }) => async tx => {
  const { selectors: { getTokenList } } = getStore()

  const { from, amount, gasLimit, gasPrice, unit, isContractCreation } = tx
  let { to, data } = tx
  let value

  // if contract creation
  if (isContractCreation) {
    value = '0'
    to = null
  } else if (ETH === unit) {
    value = ethToWeiStr(amount || '0')
  } else {
    const { contractAddress } = getTokenList()[unit]
    const contract = await nodeConnector.getTokenContractAt(contractAddress)
    data = contract.contract.transfer.getData(to, 0)
    to = contractAddress
  }

  const ret = { from, value }

  if (!isContractCreation) {
    ret.to = to
  }

  if (data) {
    ret.data = data
  }

  if (gasLimit) {
    ret.gasLimit = gasLimit
  }

  if (gasPrice) {
    ret.gasPrice = gweiToWeiStr(gasPrice)
  }

  return ret
}
