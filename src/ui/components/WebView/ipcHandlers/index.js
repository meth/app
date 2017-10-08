import Q from 'bluebird'

import web3Handler from './web3'
import apiHandler from './api'
import { IPC } from '../../../../../common/constants'

export const handleWebViewIpcRequest = Q.method(
  (type, payload, { permissions, apiMethods }) => {
    switch (type) {
      case IPC.WEB3:
        return web3Handler(payload, permissions, apiMethods)
      case IPC.API:
        return apiHandler(payload, permissions, apiMethods)
      default:
        throw new Error('Unrecognized IPC request type')
    }
  }
)
