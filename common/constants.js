module.exports = {
  STATE: {
    ERROR: 'error',
    PREPARE: 'prepare',
    CONNECTING: 'connecting',
    CONNECTED: 'connected',
    DISCONNECTING: 'disconnecting',
    DISCONNECTED: 'disconnected',
    CONNECTON_ERROR: 'connection_error',
    LOADING: 'LOADING',
    LOADED: 'LOADED',
  },
  EVENT: {
    STATE_CHANGE: 'state_change',
    NEW_BLOCK: 'new_block',
  },
  BACKEND_TASKS: {
    SET_WINDOW_ID: 'backend-set-window-id',
  },
  API_COMMAND: {
    CREATE_ACCOUNT: 'CREATE_ACCOUNT',
  },
  DAPP_PERMISSIONS: {
    CREATE_ACCOUNT: 'CREATE_ACCOUNT',
  },
  IPC: {
    BACKEND_TASK: 'backend-task',
    UI_RELOAD: 'ui-reload',
    UI_TASK_NOTIFY: 'ui-task-notify',
    WEBVIEW: 'WEBVIEW',
    WEB3: 'WEB3',
    API: 'API',
  },
  ERROR: {
    METHOD_NOT_ALLOWED: 'METHOD_NOT_ALLOWED',
    METHOD_CALL_ERROR: 'METHOD_CALL_ERROR',
    REQUEST_TIMEOUT: 'REQUEST_TIMEOUT',
    UNABLE_TO_CONNECT: 'UNABLE_TO_CONNECT',
    CORRUPT_DATA: 'CORRUPT_DATA',
    WALLET_NOT_LOADED: 'WALLET_NOT_LOADED',
  },
}
