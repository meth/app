const _ = require('lodash'),
  Q = require('bluebird'),
  path = require('path'),
  { app, BrowserWindow, ipcMain: ipc } = require('electron'),
  EventEmitter = require('events').EventEmitter,
  Settings = require('./settings'),
  { IPC } = require('../common/constants'),
  log = require('./logger').create('Windows')



/**
 * Window manager.
 */
class Windows {
  constructor () {
    this._windows = []
    this._windowsById = {}
    this._windowsByType = {}
  }

  /**
   * Create window.
   *
   * @param {String} type UI type - tells frontend which specifically UI to display.
   * @param {String} config.browserWindow Options to pass to `BrowserWindow` constructor.
   * @param {Boolean} [config.isMain] If true then marks this as a main window.
   * @param {String} [config.unique] If true then only one window of this `uiName` is allowed at a time, and thus any existing window will be returned.
   * @return {Window}
   */
  create (type, config) {
    log.info(`Create window: ${type}`)

    if (config.unique) {
      const existing = this._windowsByType[type]

      if (existing && existing.length) {
        log.debug(`Window already created`)

        return existing[0]
      }
    }

    // url
    config.url = Settings.inProductionMode
      ? 'file://' + Settings.appResDir() + '/index.html#Main'
      : 'http://localhost:3456/#Main'

    let wnd = new Window(`${type}-${Math.random() * 100000}`, type, config)

    // save to list
    this._windows.push(wnd)
    // save by type
    this._windowsByType[type] = this._windowsByType[type] || []
    this._windowsByType[type].push(wnd)

    wnd.on('closed', () => {
      this._onWindowClosed(wnd)
    })

    return wnd
  }


  /**
   * Get window by id.
   *
   * @param {String} id Window id.
   *
   * @param {Window} null if not found.
   */
  getById (id) {
    return this._windowsById[id]
  }


  /**
   * Get window by IPC sender reference.
   *
   * @param {Object} sender IPC sender.
   *
   * @param {Window} null if not found.
   */
  getByIpcSender (sender) {
    return this._windowsById[sender.id]
  }


  /**
   * Get window by type
   *
   * @param {String} type Window type.
   *
   * @param {Array} list of `Window` instances which match.
   */
  getByType (type) {
    return this._windowsByType[type]
  }


  /**
   * Set window id from IPC sender
   *
   * @return {String} the window id which can be passed to `getById()`
   */
  setWindowIdFromIpcSender (sender) {
    const browserWindow = BrowserWindow.fromWebContents(sender)
    const wnd = this._windows.find(w => w.nativeBrowserWindow === browserWindow)

    if (wnd) {
      wnd.setId(sender.id)
      this._windowsById[wnd.id] = wnd

      return wnd.id
    }
  }


  /**
  * Handle a window being closed.
  *
  * @param {String} window id
  */
  _onWindowClosed (wnd) {
    const id = wnd.id
    const type = wnd.type

    log.debug(`Window closed: ${id} (${type})`)

    // remove references
    delete this._windowsById[id]

    const typePos = this._windowsByType[type].findIndex(a => a.id === id)
    this._windowsByType[type].splice(typePos, 1)

    const listPos = this._windows.findIndex(a => a.id === id)
    this._windows.splice(typePos, 1)

    // check if any main windows are still shown
    const anyOpen = _.find(this._windows, (wnd) => (
      wnd.config.isMain && wnd.isShown
    ))

    // if no main windows are showing then quit
    if (!anyOpen && process.platform !== 'darwin') {
      log.info('All primary windows closed/invisible, so quitting app...')

      app.quit()
    }
  }
}


class Window extends EventEmitter {
  constructor (id, type, config) {
    super()

    this._id = id
    this._type = type
    this._config = config
    this._isShown = false
    this._isDestroyed = false
    this._log = log.create(id)
    // promise to track when content is ready
    this._onContentReady = new Q(resolve => {
      this._onContentReadyCallback = resolve
    })

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
        preload: path.join(__dirname, 'windowPreload', 'browser.js'),
        webaudio: true,
        webgl: false,
        webSecurity: false, // necessary to make routing work on file:// protocol
        textAreasAreResizable: true,
      },
    }

    _.extend(electronOptions, config.electronOptions)

    // for security and safety we enforce certain things
    // (https://github.com/electron/electron/pull/8348)
    electronOptions.webPreferences.nodeIntegration = false
    electronOptions.webPreferences.contextIsolation = true

    this._log.debug('Creating browser window')

    this._window = new BrowserWindow(electronOptions)
    this._webContents = this._window.webContents

    this._webContents.once('did-finish-load', () => {
      this._log.debug(`Content loaded`)

      this._onContentReadyCallback()

      this.show()

      this.emit('ready')
    })

    this._window.once('closed', () => {
      this._log.debug(`Destroyed`)

      this._isShown = false
      this._isDestroyed = true
      this._isContentReady = false

      this.emit('closed')
    })

    this._window.on('show', (e) => {
      this._log.debug(`Shown`)

      this._isShown = true

      this.emit('show', e)
    })

    this._window.on('hide', (e) => {
      this._log.debug(`Hidden`)

      this._isShown = false

      this.emit('hide', e)
    })

    if (config.url) {
      this.load(config.url)
    }
  }

  /**
   * Set IPC sender
   *
   * Can only be called once.
   */
  setId (id) {
    if (undefined !== this._id && null !== this._id) {
      this._log.debug('Id already set, skipping')
    }

    this._log.debug(`Set id: ${id}`)

    this._id = id
  }

  get id () {
    return this._id
  }

  get type () {
    return this._type
  }

  get config () {
    return this._config
  }

  get isShown () {
    return this._isShown
  }

  get isDestroyed () {
    return this._isDestroyed
  }

  get nativeBrowserWindow () {
    return this._window
  }

  load (url) {
    if (this._isDestroyed) {
      return
    }

    this._log.info(`Load URL: ${url}`)

    this._window.loadURL(url)
  }

  send () {
    if (this._isDestroyed) {
      this._log.debug(`Unable to send data, window destroyed`)

      return
    }

    this._onContentReady.then(() => {
      this._log.trace(`Sending data`, arguments)

      this._webContents.send.apply(
        this._webContents,
        arguments
      )
    })
  }


  hide () {
    if (this._isDestroyed) {
      return
    }

    this._log.debug(`Hide`)

    this._window.hide()
  }


  show () {
    if (this._isDestroyed) {
      return
    }

    this._log.debug(`Show`)

    this._window.show()
  }


  destroy () {
    if (this._isDestroyed) {
      return
    }

    this._log.debug(`Destroy`)

    this._window.close()
  }


  openDevTools () {
    this._window.openDevTools()
  }

  reload () {
    this._window.send(IPC.UI_RELOAD)
  }
}



module.exports = new Windows()
