const { Menu, app } = require('electron')
const { t } = require('../common/strings')


exports.setup = (mainWindow) => {
  var template = [{
    label: t('menu.application'),
    submenu: [
      { label: t('menu.about'), selector: "orderFrontStandardAboutPanel:" },
      { type: "separator" },
      { label: t('menu.devTools'), accelerator: "Alt+Command+I", click: () => mainWindow.openDevTools() },
      { label: t('menu.reload'), accelerator: "Command+R", click: () => mainWindow.reload() },
      { type: "separator" },
      { label: t('menu.quit'), accelerator: "Command+Q", click: () => app.quit() }
    ]}, {
    label: t('menu.edit'),
    submenu: [
      { label: t('menu.undo'), accelerator: "Command+Z", selector: "undo:" },
      { label: t('menu.redo'), accelerator: "Shift+Command+Z", selector: "redo:" },
      { type: "separator" },
      { label: t('menu.cut'), accelerator: "Command+X", selector: "cut:" },
      { label: t('menu.copy'), accelerator: "Command+C", selector: "copy:" },
      { label: t('menu.paste'), accelerator: "Command+V", selector: "paste:" },
      { label: t('menu.selectAll'), accelerator: "Command+A", selector: "selectAll:" }
    ]}
  ]

  Menu.setApplicationMenu(Menu.buildFromTemplate(template))
}
