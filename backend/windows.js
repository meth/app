const _ = require('lodash'),
  path = require('path'),
  { app, BrowserWindow, ipcMain: ipc } = require('electron'),
  EventEmitter = require('events').EventEmitter,
  Settings = require('./settings'),
  { ICP } = require('../common/constants'),
  log = require('./logger').create('Windows')



/**
 * Window manager.
 */
class Windows {
  constructor () {
    this._windows = {};
  }

  /**
   * Create window.
   *
   * @param {String} id Unique window id
   * @param {String} config.browserWindow Options to pass to `BrowserWindow` constructor.
   * @param {Boolean} [config.isMain] If set then marks this as a main window.
   * @param {String} [config.url] URL to load.
   * @return {Window}
   */
  create (id, config) {
    log.info(`Create window ${id}`);

    if (this._windows[id]) {
      log.debug(`Window already created`);

      return this._windows[id];
    }

    let wnd = new Window(id, config);

    this._windows[id] = wnd;

    wnd.on('closed', () => {
      this._onWindowClosed(id);
    });

    return wnd;
  }


  /**
   * Get window by id.
   *
   * @param {String} type Window id.
   *
   * @param {Window} null if not found.
   */
  get(id) {
    return _.find(this._windows, (w) => {
      return w.id === id;
    });
  }


  /**
  * Handle a window being closed.
  *
  * @param {String} window id
  */
  _onWindowClosed (id) {
    log.debug(`Window closed: ${id}`);

    delete this._windows[id];

    const anyOpen = _.find(this._windows, (wnd) => {
      return wnd.config.isMain && wnd.isShown;
    });

    if (!anyOpen && process.platform !== 'darwin') {
      log.info('All primary windows closed/invisible, so quitting app...');

      app.quit();
    }
  }
}


class Window extends EventEmitter {
  constructor (id, config) {
    super();

    this._id = id;
    this._config = config;
    this._isShown = false;
    this._isDestroyed = false;
    this._log = log.create(id);

    let electronOptions = {
      title: Settings.appName,
      show: true,
      width: 1100,
      height: 720,
      center: true,
      resizable: true,
      // icon: global.icon,
      // titleBarStyle: 'hidden-inset', //hidden-inset: more space
      backgroundColor: '#000',
      acceptFirstMouse: true,
      darkTheme: true,
      webPreferences: {
        preload: path.join(__dirname, 'windowPreload', 'index.js'),
        nodeIntegration: true,
        webaudio: true,
        webgl: false,
        webSecurity: false, // necessary to make routing work on file:// protocol
        textAreasAreResizable: true,
      },
    };

    _.extend(electronOptions, config.electronOptions);

    this._log.debug('Creating browser window');

    this._window = new BrowserWindow(electronOptions);
    this._webContents = this._window.webContents;

    this._webContents.once('did-finish-load', () => {
      this._isContentReady = true;

      this._log.debug(`Content loaded, id: ${this.id}`);

      this.show();

      this.emit('ready');
    });

    this._window.once('closed', () => {
      this._log.debug(`Destroyed`);

      this._isShown = false;
      this._isDestroyed = true;
      this._isContentReady = false;

      this.emit('closed');
    });

    this._window.on('show', (e) => {
      this._log.debug(`Shown`);

      this._isShown = true;

      this.emit('show', e);
    });

    this._window.on('hide', (e) => {
      this._log.debug(`Hidden`);

      this._isShown = false;

      this.emit('hide', e);
    });

    if (config.url) {
      this.load(config.url);
    }
  }

  get id () {
    return this._id;
  }

  get config () {
    return this._config;
  }

  get isShown () {
    return this._isShown;
  }

  get isDestroyed () {
    return this._isDestroyed;
  }

  get browserWindow () {
    return this._window;
  }

  load (url) {
    if (this._isDestroyed) {
      return;
    }

    this._log.info(`Load URL: ${url}`);

    this._window.loadURL(url);
  }

  send () {
    if (this._isDestroyed || !this._isContentReady) {
      this._log.trace(`Unable to send data, window destroyed or content not yet ready`);

      return;
    }

    this._log.trace(`Sending data`, arguments);

    this._webContents.send.apply(
      this._webContents,
      arguments
    );
  }


  hide () {
    if (this._isDestroyed) {
      return;
    }

    this._log.debug(`Hide`);

    this._window.hide();
  }


  show () {
    if (this._isDestroyed) {
      return;
    }

    this._log.debug(`Show`);

    this._window.show();
  }


  destroy () {
    if (this._isDestroyed) {
      return;
    }

    this._log.debug(`Destroy`);

    this._window.close();
  }


  openDevTools () {
    this._window.openDevTools();
  }

  reload () {
    this._window.send(IPC.UI_RELOAD)
  }
}



module.exports = new Windows();
