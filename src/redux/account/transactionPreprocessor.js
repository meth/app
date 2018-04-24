import { ETH, TRANSACTION_TYPE } from '../../../common/constants/protocol'
import { ethToWeiStr, gweiToWeiStr } from '../../utils/number'
import { getStore } from '../'

const { CONTRACT_CALL, CONTRACT_CREATION, TOKEN_TRANSFER, ETH_TRANSFER } = TRANSACTION_TYPE

export default ({ nodeConnector }) => async tx => {
  const { selectors: { getTokenList } } = getStore()

  const { from, amount, gasLimit, gasPrice, unit, isContractCreation } = tx
  let { to, data } = tx
  let value
  let meta

  // if contract creation
  if (isContractCreation) {
    meta = { type: CONTRACT_CREATION }
    value = '0'
    to = null
  } else if (ETH === unit) {
    meta = { type: data ? CONTRACT_CALL : ETH_TRANSFER }
    value = ethToWeiStr(amount || '0')
  } else {
    meta = { type: TOKEN_TRANSFER, recipient: to }
    const { contractAddress } = getTokenList()[unit]
    const contract = await nodeConnector.getTokenContractAt(contractAddress)
    data = contract.contract.transfer.getData(to, 0)
    to = contractAddress
  }

  const ret = { meta, from, value }

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
