/*
 * The default preload script for all native windows of the Meth browser
 *
 * We use context isolation to ensure the browser SPA cannot access anything
 * unauthorized, see https://github.com/electron/electron/pull/8348
 *
 * The code in this file runs in a separate "context" to the code in the actual
 * browser page that is loaded in the window.
 */
const { ipcRenderer, webFrame } = require('electron')
const { IPC, BACKEND_TASKS } = require('../../common/constants')

// fn: send IPC to backend
const sendIpcToBackend = (task, params) => {
  ipcRenderer.send(IPC.BACKEND_TASK, task, params)
}

// handle frontend message
window.addEventListener('message', ({ data }) => {
  // send IPC to backend
  if (IPC.BACKEND_TASK === data.ipc) {
    sendIpcToBackend(data.task, data.params)
  } else {
    console.warn(`Unrecognized frontend message`, data)
  }
})

// handle backend ipc: reload page
ipcRenderer.on(IPC.UI_RELOAD, () => window.location.reload())

// handle backend ipc: notify UI
ipcRenderer.on(IPC.UI_TASK_NOTIFY, (e, task, status, data) => {
  webFrame.executeJavaScript(`
    window.dispatchEvent(new CustomEvent('ipc', {
      detail: {
        task: "${task}",
        status: "${status}",
        data: ${JSON.stringify(data)}
      }
    }));
  `)
})

// tell backend we have initialized
sendIpcToBackend(BACKEND_TASKS.SET_WINDOW_ID)

// Nullify globals inserted by node integration
// see https://electron.atom.io/docs/faq/#i-can-not-use-jqueryrequirejsmeteorangularjs-in-electron
webFrame.executeJavaScript(`
  delete window.require;
  delete window.exports;
  delete window.module;
`)
