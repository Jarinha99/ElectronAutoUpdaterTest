// Modules to control application life and create native browser window
const {app, BrowserWindow} = require('electron')
const { autoUpdater } = require("electron-updater")
const path = require('path')

let mainWindow

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })
  
  mainWindow.loadFile('index.html')

  return mainWindow
}

app.allowRendererProcessReuse = true

app.on('ready', () => {
  createWindow();

  autoUpdater.checkForUpdatesAndNotify()

  mainWindow.webContents.on('did-finish-load', () => {
    mainWindow.webContents.send('version', app.getVersion())
  })
})

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  app.quit()
})

app.on('activate', function () {
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

const dispatch = (data) => {
  console.log(data)
  mainWindow.webContents.send('message', data)
}

autoUpdater.on('checking-for-update', () => {
  dispatch('Checking for update...')
})

autoUpdater.on('update-available', (info) => {
  dispatch('Update available.')
})

autoUpdater.on('update-not-available', (info) => {
  dispatch('Update not available.')
})

autoUpdater.on('error', (err) => {
  dispatch('Error in auto-updater. ' + err)
})

autoUpdater.on('download-progress', (progressObj) => {
  win.webContents.send('download-progress', progressObj.percent)
})

autoUpdater.on('update-downloaded', (info) => {
  dispatch('Update downloaded')
})




