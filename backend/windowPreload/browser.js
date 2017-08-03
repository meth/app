/*
 * The default preload script for all windows of the Meth browser
 *
 * We use context isolation to ensure the browser SPA cannot access anything
 * unauthorized, see https://github.com/electron/electron/pull/8348
 *
 * The code in this file runs in a separate "context" to the code in the actual
 * browser page that is loaded in the window.
 */
const { ipcRenderer } = require('electron')
const { IPC } = require('../../common/constants')

window.addEventListener('message', (event) => {
  // IPC to back onto backend?
  if (IPC.BACKEND_TASK === event.data.ipc) {
    ipcRenderer.send(IPC.BACKEND_TASK, event.data.task, event.data.params)
  }
})
