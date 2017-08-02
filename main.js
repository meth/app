const { app, BrowserWindow } = require('electron'),
  Settings = require('./backend/settings'),
  Windows = require('./backend/windows'),
  IpcManager = require('./backend/ipc'),
  log = require('./backend/logger').create('main')


let mainWindow


function createMainWindow () {
  log.info('Creating main window ...')

  // url
  const url = Settings.inProductionMode
    ? 'file://' + __dirname + '/index.html#Main'
    : 'http://localhost:3456#Main'

  // Create the browser window.
  mainWindow = Windows.create('main', {
    isMain: true
  })

  // Emitted when the window is closed.
  mainWindow.on('closed', function() {
    log.info('Window closed')

    mainWindow = null
  })

  // load URL
  mainWindow.load(url)

  require('./backend/menu').setup(mainWindow)
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', () => {
  log.info('App ready')

  createMainWindow()
})

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  log.debug('All windows closed')

  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    log.debug('Exit app')

    app.quit()
  }
})


// activate
app.on('activate', function () {
  log.info('App activated')

  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (!mainWindow) {
    createMainWindow()
  } else {
    mainWindow.show()
  }
})
