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
  FETCH_RECOMMENDED_GAS_LIMIT,
  CHECK_PENDING_TRANSACTIONS
} from './actions'
import { t } from '../../../common/strings'
import { TRANSACTION_STATUS } from '../../../common/constants/protocol'
import { getStore } from '../'
import createTransactionPreprocessor from './transactionPreprocessor'
import { createAction } from '../utils'
import { SendTransactionError } from '../../utils/errors'
import { hexToNumber } from '../../utils/number'
import logger from '../../logger'

const log = logger.create('walletMiddleware')

// eslint-disable-next-line consistent-return
export default ({ nodeConnector, walletManager }) => {
  const preprocessTransaction = createTransactionPreprocessor({ nodeConnector })

  return () => next => async action => {
    const { selectors: {
      getTxDeferred,
      getNodeConnection,
      getTokenList,
      getTransactionHistory
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

        const { tx, tx: { from } } = action.payload

        try {
          const preTx = await preprocessTransaction(tx)

          // estimate gas limit
          const estimate = hexToNumber(await nodeConnector.estimateGas(preTx))
          if (estimate > preTx.gasLimit) {
            preTx.gasLimit = estimate
          }

          // chain id
          const { network: { chainId } } = getNodeConnection()
          log.debug(`chainId: ${chainId}`)

          // nonce
          const nonce = await nodeConnector.rawCall('eth_getTransactionCount', [ from, 'latest' ])
          log.debug(`nonce: ${nonce}`)

          const rawTx = await walletManager.wallet().sign({
            ...preTx,
            nonce,
            chainId
          })

          log.info(`Raw transaction: 0x...(${rawTx.length} chars)`)

          return {
            params: preTx,
            str: rawTx
          }
        } catch (err) {
          log.warn('Error generating raw tx', err)

          throw new Error(t('error.unableToGenerateRawTx'))
        }
      }
      case SEND_RAW_TX: {
        const { params, str } = action.payload

        const id = await nodeConnector.rawCall('eth_sendRawTransaction', [ str ])

        await next(createAction(action.type, { id, params }))

        return id
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
          await contract.balanceOf.call('0x29d7d1dd5b6f9c864d9db560d72a247c178ae86b')
        } catch (err) {
          throw new Error(t('error.tokenContractNotFound'))
        }

        return next(action)
      }
      case FETCH_RECOMMENDED_GAS_LIMIT: {
        const { tx } = action.payload

        try {
          const preTx = await preprocessTransaction(tx)

          const estimate = await nodeConnector.estimateGas(preTx)

          const estimateNum = hexToNumber(estimate)

          log.debug(`Gas estimate: ${estimateNum}`)

          return estimateNum
        } catch (err) {
          log.warn('Error fetching gas estimate', err)

          throw new Error(t('error.unableToEstimateGas'))
        }
      }
      case CHECK_PENDING_TRANSACTIONS: {
        const allTx = getTransactionHistory()
        const pendingTx = allTx.filter(tx => !tx.receipt)

        if (!pendingTx.length) {
          return null
        }

        log.debug(`Pending transactions: ${pendingTx.length}`)

        try {
          const receipts = await Promise.all(pendingTx.map(({ id }) => (
            nodeConnector.rawCall('eth_getTransactionReceipt', [ id ])
          )))

          receipts.forEach(r => {
            const {
              transactionHash,
              blockHash,
              blockNumber,
              gasUsed,
              contractAddress,
              status
            } = r

            const tx = allTx.find(({ id }) => id === transactionHash)

            tx.receipt = {
              blockHash,
              blockNumber: hexToNumber(blockNumber),
              gasUsed: hexToNumber(gasUsed),
              contractAddress,
              status: (hexToNumber(status) === 1
                ? TRANSACTION_STATUS.ACCEPTED
                : TRANSACTION_STATUS.REJECTED
              )
            }
          })

          return next(createAction(CHECK_PENDING_TRANSACTIONS, allTx))
        } catch (err) {
          log.warn('Error fetching transaction receipts', err)
        }

        return null
      }
      default: {
        return next(action)
      }
    }
  }
}
