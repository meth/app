import { ipcRenderer as ipc } from 'electron';
import _ from 'lodash';
import Q from 'bluebird';
import Web3 from 'web3';
import EthereumBlocks from 'ethereum-blocks';
import { IPC }  from '../../../../common/constants';


const TYPES = exports.TYPES = {
  INIT: 'INIT',
  BACKEND_INIT: 'BACKEND_INIT',
  WEB3: 'WEB3',
  WEB3_POLL: 'WEB3_POLL',
  ACCOUNTS: 'ACCOUNTS',
  BLOCK: 'BLOCK',
  BLOCK_ERROR: 'BLOCK_ERROR',
};


function buildAction(type, payload = {}) {
  if (payload && payload instanceof Error) {
    payload = {
      error: payload
    };
  }

  return {
    type: type,
    payload: payload,
  };
};



/**
 * Action dispatcher.
 */
class Dispatcher {
  constructor () {
    ipc.on(IPC.UI_TASK_NOTIFY, this._receiveTaskNotificationIpc.bind(this));
    ipc.on(IPC.UI_RELOAD, () => location.reload());
  }

  setStore (store) {
    this._dispatch = store.dispatch;
    this._getState = store.getState;
  }

  init () {
    this._stateAction(TYPES.INIT, 'in_progress');
    this._sendTaskIpc(IPC.INIT);
  }

  _connectWeb3 () {
    this._stateAction(TYPES.INIT, 'in_progress', 'Initializing web3');

    let connected = false;

    const web3 = window.web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:38545'));

    this._action(TYPES.WEB3, web3);

    this._stateAction(TYPES.INIT, 'in_progress', 'Start polling');

    this._startPolling(web3);

    this._stateAction(TYPES.INIT, 'in_progress', 'Fetching blocks');

    const blocks = new EthereumBlocks({
      web3: web3
    });
    // blocks.logger = console;

    blocks.registerHandler('default', this._blockHandler.bind(this));

    blocks.start()
      /* catch first since we don't want to catch errors from success _stateAction call */
      .catch((err) => {
        this._stateAction(TYPES.INIT, 'error', 'Block fetching failed');
      })
      .then(() => {
        this._stateAction(TYPES.INIT, 'success');
      });
  }

  _blockHandler (eventType, blockId, data) {
    switch (eventType) {
      case 'block':
        this._action(TYPES.BLOCK, data);
        break;
      case 'error':
        this._action(TYPES.BLOCK_ERROR, data);
        break;
    }
  }

  _startPolling (web3) {
    web3.getBalancePromise = Q.promisify(web3.eth.getBalance);

    this._stateAction(TYPES.WEB3_POLL, 'ready');

    const __poll = () => {
      this._stateAction(TYPES.WEB3_POLL, 'in_progress', 'Starting');

      const accounts = web3.personal.listAccounts;

      this._stateAction(TYPES.WEB3_POLL, 'in_progress', 'Fetching balances');

      Q.map(accounts, (acc) => web3.getBalancePromise(acc))
        .then((balances) => {
          this._action(TYPES.ACCOUNTS, _.zipObject(
            accounts, _.map(balances, (b) => {
              const bValue = web3.toDecimal(b);

              return {
                wei: bValue,
                ether: web3.fromWei(bValue, 'ether'),
              };
            })
          ));
        })
        .then(() => {
          this._stateAction(TYPES.WEB3_POLL, 'success');
        })
        .catch((err) => {
          this._stateAction(TYPES.WEB3_POLL, 'error', err);
        })
        .finally(() => {
          setTimeout(__poll, 2000); // repeat regularly
        });
    };

    __poll();
  }

  _action (type, payload) {
    this._dispatch(buildAction(type, payload));
  }

  _stateAction (type, state, data) {
    if (typeof state !== 'string') {
      throw new Error('State must be a string');
    }

    this._dispatch(buildAction(type, {
      state: state,
      data: data,
    }));
  }

  _sendTaskIpc(task, params) {
    ipc.send(IPC.BACKEND_TASK, task, params);
  }

  _receiveTaskNotificationIpc(e, task, state, data) {
    console.debug(`Recv IPC: task:${task} state:${state} data:${typeof data}`);

    switch (task) {
      case IPC.INIT:
        this._stateAction(TYPES.BACKEND_INIT, state, data);

        switch (state) {
          case 'in_progress':
            this._stateAction(TYPES.INIT, 'in_progress', data);
            break;
          case 'error':
            this._stateAction(TYPES.INIT, 'error', 'Backend initialization failed');
            break;
          case 'success':
            this._connectWeb3();
            break;
        }

        break;

      default:
        throw new Error('Unrecognized task', task);
    }
  }
}


exports.Dispatcher = new Dispatcher();
