/*
 * The default preload script for each Dapp browser tab.
 *
 * This will setup the web3 instance for any Dapp running in the page.
 */
const { ipcRenderer: ipc } = require('electron')
const IPC = require('../../common/constants/ipc')
const API = require('../../common/constants/api')


/* Setup generic IPC request-response mechanism */


const pendingRequests = {}

/**
 * Send an IPC request.
 * @param {String} type Payload type
 * @param  {Object} payload Payload to send
 * @return {Promise} resolves once response is received
 */
const sendIpc = (type, payload) => {
  const id = `${Date.now()}-${Math.random()}`

  const promise = new Promise((resolve, reject) => {
    pendingRequests[id] = { resolve, reject }
  })

  ipc.sendToHost(IPC.WEBVIEW, { id, type, payload })

  return promise
}

// When we receive an IPC request
ipc.on(IPC.WEBVIEW, (e, { id, error, response }) => {
  const req = pendingRequests[id]

  if (req) {
    pendingRequests[id] = null

    if (error) {
      req.reject(error)
    } else {
      req.resolve(response)
    }
  }
})


/* Setup web3 */

const Web3 = require('web3')

class Web3IpcProvider {
  isConnected () {
    return true
  }

  send () {
    throw new Error('Synchronous web3 calls are not supported.')
  }

  sendAsync (payload, callback) {
    sendIpc(IPC.WEB3, payload)
      .catch(callback)
      .then(response => {
        const hasError = [].concat(response).find(r => !!r.error)

        if (hasError) {
          callback(response)
        } else {
          callback(null, response)
        }
      })
  }
}

window.web3 = new Web3(new Web3IpcProvider())

/* Setup Meth API */

window.Meth = {
  createAccount: () => sendIpc(IPC.API, {
    command: API.CREATE_ACCOUNT
  })
}
