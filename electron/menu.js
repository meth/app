const { Menu, app } = require('electron')
const Windows = require('./windows')
const { t } = require('../strings')
const UI_TASKS = require('../src/constants/ipcUiTasks')


exports.setup = () => {
  const template = [
    {
      label: t('menu.application'),
      submenu: [
        { label: t('menu.about'), selector: 'orderFrontStandardAboutPanel:' },
        { type: 'separator' },
        { label: t('menu.reload'), accelerator: 'Command+R', click: () => Windows.getMainWindow().reload() },
        { type: 'separator' },
        { label: t('menu.quit'), accelerator: 'Command+Q', click: () => app.quit() }
      ]
    },
    {
      label: t('menu.edit'),
      submenu: [
        { label: t('menu.undo'), accelerator: 'Command+Z', selector: 'undo:' },
        { label: t('menu.redo'), accelerator: 'Shift+Command+Z', selector: 'redo:' },
        { type: 'separator' },
        { label: t('menu.cut'), accelerator: 'Command+X', selector: 'cut:' },
        { label: t('menu.copy'), accelerator: 'Command+C', selector: 'copy:' },
        { label: t('menu.paste'), accelerator: 'Command+V', selector: 'paste:' },
        { label: t('menu.selectAll'), accelerator: 'Command+A', selector: 'selectAll:' }
      ]
    },
    {
      label: t('menu.navigation'),
      submenu: [
        { label: t('menu.closeTab'), accelerator: 'Command+W', click: () => Windows.getMainWindow().send(UI_TASKS.CLOSE_TAB) },
        { label: t('menu.editUrl'), accelerator: 'Command+L', click: () => Windows.getMainWindow().send(UI_TASKS.EDIT_TAB_URL) },
        { type: 'separator' },
        { label: t('menu.previousTab'), accelerator: 'Alt+Command+Left', click: () => Windows.getMainWindow().send(UI_TASKS.GOTO_PREVIOUS_TAB) },
        { label: t('menu.nextTab'), accelerator: 'Alt+Command+Right', click: () => Windows.getMainWindow().send(UI_TASKS.GOTO_NEXT_TAB) },
        { label: t('menu.newTab'), accelerator: 'Command+T', click: () => Windows.getMainWindow().send(UI_TASKS.OPEN_NEW_TAB) }
      ]
    },
    {
      label: t('menu.developer'),
      submenu: [
        { label: t('menu.devTools'), accelerator: 'Alt+Command+I', click: () => Windows.getMainWindow().openDevTools() },
        { label: t('menu.activeTabDevTools'), accelerator: 'Alt+Command+U', click: () => Windows.getMainWindow().send(UI_TASKS.OPEN_ACTIVE_TAB_DEV_TOOLS) }
      ]
    }
  ]


  Menu.setApplicationMenu(Menu.buildFromTemplate(template))
}
