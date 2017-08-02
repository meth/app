const electron = require('electron'),
  Menu = electron.Menu,
  app = electron.app,
  CONSTANTS = require('../common/constants');


exports.setup = function(mainWindow) {
  var template = [{
      label: "Application",
      submenu: [
          { label: "About Application", selector: "orderFrontStandardAboutPanel:" },
          { type: "separator" },
          { label: "Dev Tools", accelerator: "Alt+Command+I", click: function() { mainWindow.openDevTools(); }},
          { label: "Reload", accelerator: "Command+R", click: function() { mainWindow.send(CONSTANTS.IPC.UI_RELOAD); }},
          { type: "separator" },
          { label: "Quit", accelerator: "Command+Q", click: function() { app.quit(); }}
      ]}, {
      label: "Edit",
      submenu: [
          { label: "Undo", accelerator: "Command+Z", selector: "undo:" },
          { label: "Redo", accelerator: "Shift+Command+Z", selector: "redo:" },
          { type: "separator" },
          { label: "Cut", accelerator: "Command+X", selector: "cut:" },
          { label: "Copy", accelerator: "Command+C", selector: "copy:" },
          { label: "Paste", accelerator: "Command+V", selector: "paste:" },
          { label: "Select All", accelerator: "Command+A", selector: "selectAll:" }
      ]}
  ];

  Menu.setApplicationMenu(Menu.buildFromTemplate(template));
}
