import _ from 'lodash'
import {
  SEND_TX,
  CANCEL_TX,
  SEND_RAW_TX,
  GENERATE_RAW_TX,
  LOAD_WALLET,
  GENERATE_MNEMONIC,
  FETCH_TOKEN_BALANCE,
  ADD_CUSTOM_TOKEN,
  UPDATE_CUSTOM_TOKEN,
  GENERATE_ACCOUNT,
  FETCH_RECOMMENDED_GAS_LIMIT
} from './actions'
import { t } from '../../../common/strings'
import { ETH } from '../../../common/constants/protocol'
import { getStore } from '../'
import { createAction } from '../utils'
import { SendTransactionError } from '../../utils/errors'
import { hexToNumber, ethToWeiStr } from '../../utils/number'
import logger from '../../logger'

const log = logger.create('walletMiddleware')

// eslint-disable-next-line consistent-return
export default ({ nodeConnector, walletManager }) => () => next => async action => {
  const { selectors: {
    getTxDeferred,
    getNodeConnection,
    getTokenList
  } } = getStore()

  switch (action.type) {
    case GENERATE_MNEMONIC: {
      return walletManager.generateMnemonic()
    }
    case GENERATE_ACCOUNT: {
      return walletManager.wallet().generateAddress()
    }
    case LOAD_WALLET: {
      log.debug('Load wallet ...')

      const mnemonic = action.payload
      log.debug(`Mnemonic: ${mnemonic}`)

      await walletManager.load(mnemonic)

      return next(action)
    }
    case SEND_TX: {
      const existingDeferred = getTxDeferred()

      if (existingDeferred) {
        return Promise.reject(
          new SendTransactionError(t('error.transactionAlreadyInProgress'))
        )
      }

      let deferred = null

      const promise = new Promise((resolve, reject) => {
        deferred = { resolve, reject }
      })

      await next(createAction(SEND_TX, {
        ...action.payload,
        deferred
      }))

      // we return a promise which the caller can wait on to know if/when the
      // tx passes/fails
      return promise
    }
    case CANCEL_TX: {
      const deferred = getTxDeferred()

      if (deferred) {
        deferred.reject(action.payload)
      }

      return next(action)
    }
    case GENERATE_RAW_TX: {
      log.debug('Generate raw tx ...')

      const {
        tx: {
          from,
          to,
          amount,
          data,
          gasLimit,
          gasPrice,
          unit,
          isContractCreation
        }
      } = action.payload

      try {
        // we may override this below
        let toOverride = to

        // set transfer value
        let value = ethToWeiStr(amount)
        // if not deploying a contract and it's a token transfer
        if (!isContractCreation && ETH !== unit) {
          value = '0'
          // TODO: calculate "data" using token transfer()
        }

        // chain id
        const { network: { chainId } } = getNodeConnection()
        log.debug(`chainId: ${chainId}`)

        // nonce
        const nonce = await nodeConnector.rawCall('eth_getTransactionCount', [ from, 'latest' ])
        log.debug(`nonce: ${nonce}`)

        const rawTx = await walletManager.wallet().sign({
          from,
          ...(isContractCreation ? null : { to: toOverride }),
          value,
          data,
          gasLimit,
          gasPrice,
          nonce,
          chainId
        })

        log.info(`Raw transaction: 0x...(${rawTx.length} chars)`)

        return rawTx
      } catch (err) {
        log.warn('Error generating raw tx', err)

        throw new Error(t('error.unableToGenerateRawTx'))
      }
    }
    case SEND_RAW_TX: {
      const rawTx = action.payload

      const receipt =
        await nodeConnector.rawCall('eth_sendRawTransaction', [ rawTx ])

      await next(createAction(action.type, receipt))

      return Promise.resolve(receipt)
    }
    case FETCH_TOKEN_BALANCE: {
      const { symbol, accountAddress } = action.payload

      const { contractAddress } = getTokenList()[symbol]

      const contract = await nodeConnector.getTokenContractAt(contractAddress)

      const balance = await contract.balanceOf(accountAddress)

      return next(createAction(FETCH_TOKEN_BALANCE, {
        ...action.payload,
        balance
      }))
    }
    case ADD_CUSTOM_TOKEN: {
      const { symbol, details: { contractAddress } } = action.payload

      // ensure token doesn't already exist
      const existsAlready = _.get(getTokenList(), symbol)

      if (existsAlready) {
        throw new Error(t('error.tokenAlreadyExists'))
      }

      // ensure token contract is valid
      try {
        const contract = await nodeConnector.getTokenContractAt(contractAddress)
        await contract.balanceOf('0x29d7d1dd5b6f9c864d9db560d72a247c178ae86b')
      } catch (err) {
        throw new Error(t('error.tokenContractNotFound'))
      }

      return next(action)
    }
    case UPDATE_CUSTOM_TOKEN: {
      const { symbol, details: { symbol: newSymbol, contractAddress } } = action.payload

      // ensure token doesn't already exist
      const existsAlready = _.get(getTokenList(), newSymbol)

      if (symbol !== newSymbol && existsAlready) {
        throw new Error(t('error.tokenAlreadyExists'))
      }

      // ensure token contract is valid
      try {
        const contract = await nodeConnector.getTokenContractAt(contractAddress)
        await contract.balanceOf('0x29d7d1dd5b6f9c864d9db560d72a247c178ae86b')
      } catch (err) {
        throw new Error(t('error.tokenContractNotFound'))
      }

      return next(action)
    }
    case FETCH_RECOMMENDED_GAS_LIMIT: {
      const { tx: { from, to, amount, gasPrice, data, unit, isContractCreation } } = action.payload

      try {
        let value
        if (ETH === unit) {
          value = ethToWeiStr(amount)
        } else {
          // TODO: if it's a token transfer then need to estimate based on token transfer
        }

        const estimate = await nodeConnector.estimateGas({
          from,
          ...(isContractCreation ? null : { to }),
          value,
          data,
          gasPrice
        })

        const estimateNum = hexToNumber(estimate)

        log.debug(`Gas estimate: ${estimateNum}`)

        return estimateNum
      } catch (err) {
        log.warn('Error fetching gas estimate', action.payload)

        throw new Error(t('error.unableToEstimateGas'))
      }
    }
    default: {
      return next(action)
    }
  }
}
