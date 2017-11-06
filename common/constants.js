module.exports = {
  STATE: {
    ERROR: 'error',
    PREPARE: 'prepare',
    CONNECTING: 'connecting',
    CONNECTED: 'connected',
    DISCONNECTING: 'disconnecting',
    DISCONNECTED: 'disconnected',
    CONNECTON_ERROR: 'connectionError',
    LOADING: 'LOADING',
    LOADED: 'LOADED'
  },
  EVENT: {
    STATE_CHANGE: 'state_change',
    NEW_BLOCK: 'new_block',
    NEW_BALANCES: 'new_balances'
  },
  BACKEND_TASKS: {
    SET_WINDOW_ID: 'backend-set-window-id'
  },
  API_COMMAND: {
    CREATE_ACCOUNT: 'CREATE_ACCOUNT'
  },
  DAPP_PERMISSIONS: {
    CREATE_ACCOUNT: 'CREATE_ACCOUNT'
  },
  IPC: {
    BACKEND_TASK: 'backend-task',
    UI_TASK: 'ui-task',
    WEBVIEW: 'WEBVIEW',
    WEB3: 'WEB3',
    API: 'API'
  },
  UI_TASKS: {
    RELOAD: 'reload',
    OPEN_ACTIVE_TAB_DEV_TOOLS: 'open-active-tab-dev-tools'
  }
}
