import _ from 'lodash'
import { EthHdWallet } from 'eth-hd-wallet'
import EventEmitter from 'eventemitter3'

import logger from '../logger'
import { hexStrToBigNum, toHexStr, toInt } from '../utils/number'
import { WalletNotLoadedError } from '../utils/errors'
import EVENT from '../../common/constants/events'
import STATE from '../../common/constants/states'

const log = logger.create('Wallet')

class Wallet extends EventEmitter {
  constructor ({ store, nodeConnector }, mnemonic) {
    super()

    this._nodeConnector = nodeConnector
    this._store = store
    this._mnemonic = mnemonic
  }

  /**
   * Initialize this wallet.
   *
   * Should be called after construction.
   *
   * @return {Promise}
   */
  async init () {
    log.info(`Initialize wallet ...`)

    this._nodeConnector.on(
      EVENT.STATE_CHANGE,
      this._onNodeConnectionStateChange.bind(this)
    )

    this._nodeConnector.on(EVENT.NEW_BLOCK, this._onNewBlock.bind(this))

    // if node connector is connected then load!
    if (this._nodeConnector.isConnected) {
      this._reload()
    } else {
      // else show the connection modal
      this._store.actions.showConnectionModal()
    }
  }

  /**
   * Reset this wallet.
   *
   * `init()` will need to be called to again use this wallet.
   *
   * @return {Promise}
   */
  async destroy () {
    log.info('Unload wallet ...')

    this._nodeConnector.removeListener(
      EVENT.STATE_CHANGE,
      this._onNodeConnectionStateChange
    )
    this._nodeConnector.removeListener(EVENT.NEW_BLOCK, this._onNewBlock)

    this._hdWallet = null
    this._balances = []
  }

  /**
   * Get all generated addresses.
   * @return {Array}
   */
  getAddresses () {
    return this._hdWallet ? this._hdWallet.getAddresses() : []
  }

  /**
   * Get all generated addresses along with their balances.
   * @return {Object}
   */
  getAddressBalances () {
    return this._hdWallet
      ? _.zipObject(this._hdWallet.getAddresses(), this._balances)
      : {}
  }

  /**
   * Generate next address.
   * @return {String} address generated
   */
  generateAddress () {
    this._ensureLoaded()

    const addr = this._hdWallet.generateAddresses(1).pop()

    log.info(`Generated new address: ${addr}`)

    // update balances
    this._updateBalances()

    return addr
  }

  /**
   * Generate signed transaction.
   *
   * @param  {String} from From address
   * @param  {String} [to] If omitted then deploying a contract
   * @param  {Number} value Amount of wei to send
   * @param  {String} data Data
   * @param  {Number} gasLimit Total Gas to use
   * @param  {Number} gasPrice Gas price (wei per gas unit)
   * @param  {String} chainId Chain id
   *
   * @return {String} Raw transaction string.
   */
  async sign ({ nonce, from, to, value, data, gasLimit, gasPrice, chainId }) {
    const payload = {
      nonce,
      from,
      to,
      value: toHexStr(value),
      data,
      gasLimit: toHexStr(gasLimit),
      gasPrice: toHexStr(gasPrice),
      chainId: toInt(chainId)
    }

    log.info('Sign transaction', {
      ...payload,
      value: value ? `${payload.value} (${value})` : undefined,
      gasLimit: `${payload.gasLimit} (${gasLimit})`,
      gasPrice: `${payload.gasPrice} (${gasPrice})`,
      data: data ? `0x...(${data.length} chars)` : data
    })

    return this._hdWallet.sign(payload)
  }

  /**
   * Get balance of address
   * @return {Promise}
   */
  async _getBalance (address) {
    return this._nodeConnector.rawCall('eth_getBalance', [ address, 'latest' ])
  }

  /**
   * Handler for node connection state change event
   */
  _onNodeConnectionStateChange (newState) {
    log.debug('Node connection state changed')

    switch (newState) {
      // once connected
      case STATE.CONNECTED:
        log.info('Node connection established, re/loading wallet data ...')
        // re-load the wallet data
        this._reload()
        break

      default:
        break
    }
  }

  /**
   * Handler for new block event
   */
  _onNewBlock () {
    if (!this._hdWallet) {
      return
    }

    log.debug('New block received, update balances')

    this._updateBalances()
  }

  /**
   * Update account balances\
   */
  async _updateBalances () {
    log.debug('Update address balances ...')

    const addresses = this._hdWallet.getAddresses()

    try {
      const balances = await Promise.all(
        addresses.map(a => this._getBalance(a))
      )

      await this._setBalancesAndNotifyStore(balances)
    } catch (err) {
      log.warn('Balance query error, network probably not ready')
    }
  }

  async _setBalancesAndNotifyStore (balances) {
    this._balances = balances.map(hexStrToBigNum)

    await this._store.actions.injectAccountBalances(this.getAddressBalances())
  }

  /**
   * Ensure wallet data has been loaded.
   *
   * @throws {Error} if wallet not loaded
   */
  _ensureLoaded () {
    if (!this._hdWallet) {
      throw new WalletNotLoadedError('Wallet data not yet loaded')
    }
  }

  /**
   * Reload wallet data using stored mnemonic.
   *
   * Discover all of this wallet's generated addresses that have previously been used.
   *
   * The disovery process works according to the BIP44 spec, albeit with
   * modifications (original spec is at https://github.com/bitcoin/bips/blob/master/bip-0044.mediawiki#Account_discovery)
   *
   * - We check to address balances to see if address has been used before since
   *  checking for transaction history of an address is very costly to do time-wise.
   *
   * We still check upto 20 addresses after last "discovered" address. If next 20
   * addresses all have balance of 0 then we stop discovery.
   *
   * @return {Promise}
   */
  async _reload () {
    try {
      this._hdWallet = null

      log.debug('Load wallet from mnemonic ...')

      const wallet = EthHdWallet.fromMnemonic(this._mnemonic)

      log.debug('Discover used wallet addresses ...')

      const balances = []

      let checked = 0

      // eslint-disable-next-line consistent-return
      const _scanAddresses = async () => {
        const [ nextAddress ] = wallet.generateAddresses(1)

        // eslint-disable-next-line no-await-in-loop
        const balance = await this._getBalance(nextAddress)

        if (0 < balance) {
          checked = 0
        } else {
          checked += 1
        }

        // save balance
        balances.push(balance)

        if (20 > checked) {
          return _scanAddresses()
        }
      }

      await _scanAddresses()

      let totalAddresses = wallet.getAddressCount() - 20
      if (0 >= totalAddresses) {
        totalAddresses = 1
      }

      log.info(`Discovered addresses: ${totalAddresses}`)

      // discard unwanted addresses
      wallet.discardAddresses(wallet.getAddressCount() - totalAddresses)

      this._hdWallet = wallet

      // setup initial balances
      await this._setBalancesAndNotifyStore(balances.slice(0, totalAddresses))
    } catch (err) {
      log.warn('Loading error, network probably not ready yet', err.message)
    }
  }
}

export default Wallet
