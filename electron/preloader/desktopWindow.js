/*
 * The preload script for any desktop window.
 *
 * We use context isolation to ensure the browser SPA cannot access anything
 * unauthorized, see https://github.com/electron/electron/pull/8348
 *
 * The code in this file runs in a separate "context" to the code in the actual
 * browser page that is loaded in the window.
 */
const { ipcRenderer, webFrame } = require('electron')
const IPC = require('../../common/constants/ipc')
const BACKEND_TASKS = require('../../common/constants/ipcBackendTasks')
const UI_TASKS = require('../../common/constants/ipcUiTasks')
const Settings = require('../settings')

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
    // do nothing, it's likely something to do with tools, e.g. webpack
  }
})

// handle backend ipc: notify UI
ipcRenderer.on(IPC.UI_TASK, (e, task, data) => {
  switch (task) {
    case UI_TASKS.RELOAD: {
      return window.location.reload()
    }
    default: {
      return webFrame.executeJavaScript(`
        window.dispatchEvent(new CustomEvent('${IPC.UI_TASK}', {
          detail: {
            task: "${task}",
            data: ${JSON.stringify(data)}
          }
        }));
      `)
    }
  }
})

// tell backend we have initialized
sendIpcToBackend(BACKEND_TASKS.SET_WINDOW_ID)

// Nullify globals inserted by node integration
// see https://electron.atom.io/docs/faq/#i-can-not-use-jqueryrequirejsmeteorangularjs-in-electron
webFrame.executeJavaScript(`
  delete window.require;
  delete window.exports;
  delete window.module;
  window.preloadBasePath = "${Settings.preloadBasePath}";
  window.isElectron = true;
`)
