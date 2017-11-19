const path = require('path')
const { BrowserWindow } = require('electron')
const EventEmitter = require('eventemitter3')

const _ = require('./lodash')
const Settings = require('./settings')
const IPC = require('../src/constants/ipc')
const UI_TASKS = require('../src/constants/ipc-ui-tasks')

const log = require('./logger').create('Windows')


class Window extends EventEmitter {
  constructor (type, config = {}) {
    super()

    this._type = type
    this._config = config
    this._isShown = false
    this._isDestroyed = false
    this._log = log.create(this._type)

    // promise to track when content is ready
    this._onContentReady = new Promise(resolve => {
      this._onContentReadyCallback = resolve
    })

    const electronOptions = {
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
        /*
        Security:
        https://github.com/electron/electron/pull/8348
        https://github.com/electron/electron/blob/master/docs/tutorial/security.md
         */
        nodeIntegration: false,
        contextIsolation: true,
        preload: path.join(Settings.preloadBasePath, 'desktopWindow.js'),
        webaudio: true,
        webgl: false,
        webSecurity: false, // necessary to make routing work on file:// protocol
        textAreasAreResizable: true
      }
    }

    _.deepExtend(electronOptions, config.electronOptions || {})

    this._log.debug('Creating window')

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

    this._window.on('show', e => {
      this._log.debug(`Shown`)

      this._isShown = true

      this.emit('show', e)
    })

    this._window.on('hide', e => {
      this._log.debug(`Hidden`)

      this._isShown = false

      this.emit('hide', e)
    })

    const url = config.url || (Settings.inProductionMode
      ? `file://${Settings.appResDir()}/index.html#${type}`
      : `http://localhost:3000/#${type}`
    )

    this.load(url)
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

    this._id = id
    this._log.debug(`Set id: ${this._id}`)
    this._log = log.create(`${this._type}-${this._id}`)
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

  onceReady () {
    return this._onContentReady
  }

  load (url) {
    if (this._isDestroyed) {
      return
    }

    this._log.info(`Load URL: ${url}`)

    this._window.loadURL(url)
  }

  send (...args) {
    if (this._isDestroyed) {
      this._log.debug(`Unable to send data, window destroyed`)

      return
    }

    this.onceReady().then(() => {
      this._log.trace(`Sending data`, args)

      this._webContents.send(IPC.UI_TASK, ...args)
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
    this.send(UI_TASKS.RELOAD)
  }
}

exports.Window = Window

let mainWindow

exports.setupMainWindow = () => {
  mainWindow = new Window('Main', {
    electronOptions: {
      webPreferences: {
        webviewTag: true,
        // Gotta turn off security - https://github.com/electron/electron/issues/9736
        nodeIntegration: true,
        contextIsolation: false
      }
    }
  })

  return mainWindow
}

exports.getMainWindow = () => mainWindow
