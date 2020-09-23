const electron = require('electron')
const { app, globalShortcut } = require('electron')
const BrowserWindow = electron.BrowserWindow

process.env['APP_PATH'] = app.getAppPath()

let url
if (process.env.NODE_ENV === 'DEV') {
  url = 'http://localhost:8086/'
} else {
  url = `file://${process.env['APP_PATH']}/dist/index.html`
}

app.on('ready', () => {
  let window = new BrowserWindow({
    width: 350,
    height: 560,
    frame: false
  })
  window.setResizable(false)
  window.loadURL(url)
  // Shortcuts
  // Toggle mute
  globalShortcut.register('CommandOrControl+Shift+M', () => {
    console.log('CommandOrControl+Shift+M is pressed')
  })
  // Disconnect
  globalShortcut.register('CommandOrControl+Shift+D', () => {
    console.log('CommandOrControl+Shift+D is pressed')
  })
  // Dev Tools
  globalShortcut.register('CommandOrControl+Shift+J', () => {
    window.webContents.openDevTools({detatch: true})
  })
})
