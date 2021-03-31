/* eslint global-require: off */
import { app, shell, BrowserWindow, ipcMain } from 'electron'
import log from 'electron-log'
import MenuBuilder from './menu'
import installExtension, {
  REACT_DEVELOPER_TOOLS,
  REDUX_DEVTOOLS,
} from 'electron-devtools-installer'

declare const MAIN_WINDOW_WEBPACK_ENTRY: any
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: any

// Enable dev tools
if (!app.isPackaged) {
  app.whenReady().then(() => {
    installExtension([REDUX_DEVTOOLS, REACT_DEVELOPER_TOOLS])
      .then((name: string) => console.log(`Added Extension:  ${name}`))
      .catch((err: Error) => console.log('An error occurred: ', err))
  })
}

export default class AppUpdater {
  constructor() {
    log.transports.file.level = 'info'
  }
}
let mainWindow = null

if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support')

  sourceMapSupport.install()
}

if (
  process.env.NODE_ENV === 'development' ||
  process.env.DEBUG_PROD === 'true'
) {
  require('electron-debug')()
}

let waitingForClose = false
let proceedToClose = false

const createWindow = async () => {
  mainWindow = new BrowserWindow({
    show: false,
    width: 1300,
    height: 728,
    minHeight: 500,
    minWidth: 1100,
    webPreferences: {
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
      // Allow node integration because we're only loading local content here.
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
      webSecurity: false,
    },
  })

  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY)

  // Open the DevTools.
  if (!app.isPackaged) {
    mainWindow.webContents.openDevTools()
  }

  app.on('web-contents-created', (event, contents) => {
    contents.on('new-window', async (eventInner, navigationUrl) => {
      // In this example, we'll ask the operating system
      // to open this event's url in the default browser.
      console.log('attempting to open window', navigationUrl)
      eventInner.preventDefault()
      await shell.openExternal(navigationUrl)
    })
  })
  // @TODO: Use 'ready-to-show' event
  //        https://github.com/electron/electron/blob/master/docs/api/browser-window.md#using-ready-to-show-event
  mainWindow.webContents.on('did-finish-load', () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined')
    }

    if (process.env.START_MINIMIZED) {
      mainWindow.minimize()
    } else {
      mainWindow.show()
      mainWindow.focus()
    }
  })
  mainWindow.on('close', event => {
    // If we are clear to close, then return and allow everything to close
    if (proceedToClose) {
      console.log('proceed to close, so closing')
      return
    }

    // If we're already waiting for close, then don't allow another close event to actually close the window
    if (waitingForClose) {
      console.log('Waiting for close... Timeout in 10s')
      event.preventDefault()
      return
    }

    waitingForClose = true
    event.preventDefault()
    ipcMain.on('appquitdone', () => {
      waitingForClose = false
      proceedToClose = true
      app.quit()
    })
    // $FlowFixMe
    mainWindow.webContents.send('appquitting')
    // Failsafe, timeout after 10 seconds
    setTimeout(() => {
      waitingForClose = false
      proceedToClose = true
      console.log('Timeout, quitting')
      app.quit()
    }, 10 * 1000)
  })
  mainWindow.on('closed', () => {
    mainWindow = null
  })
  const menuBuilder = new MenuBuilder(mainWindow)
  menuBuilder.buildMenu()
  // Remove this if your app does not use auto updates
  // eslint-disable-next-line
  new AppUpdater()
}

/**
 * Add event listeners...
 */
app.on('window-all-closed', () => {
  app.quit()
})
app.on('ready', createWindow)
app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) createWindow()
})