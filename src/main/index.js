import {app, shell, BrowserWindow, Menu, ipcMain,Tray ,protocol } from 'electron'
import {join} from 'path'

import {electronApp, optimizer, is} from '@electron-toolkit/utils'

import icon from '../../resources/icon.png?asset'
import os from "node:os";
import {loging, windowOperate} from "./function";



const Windows_Main_Width = 1000
const Windows_Main_Height = 670





function createWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: Windows_Main_Width,
    height: Windows_Main_Height,
    show: false,
    icon: icon,
    frame: false,
    transparent:true,
    resizable:true,
    webPreferences: {
      preload: join(__dirname, '../preload/preload.js'),
      sandbox: false,
      nodeIntegrationInWorker: true,
      // 设置内容安全策略
      webSecurity:true,
    },
    // titleBarStyle:'hidden'
  })
  const menu = Menu.buildFromTemplate([
    {
      label: 'abcd',
      submenu: [
        {
          click: () => mainWindow.webContents.send('update-counter', 1),
          label: 'Increment',
        },
        {
          click: () => mainWindow.webContents.send('update-counter', -1),
          label: 'Decrement',
        }
      ]
    }
  ])
  Menu.setApplicationMenu(menu)

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })


  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return {action: 'deny'}
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
    //DEV setting
    mainWindow.webContents.openDevTools()
  }
  mainWindow.setMinimumSize(700, 550)


}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  app.setAppUserModelId('新·极光工作室打卡器')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  // 设置系统托盘
  // const tray = new Tray('resources/icon.png')
  // const contextMenu = Menu.buildFromTemplate([
  //   { label: '退出', type: 'normal',click: ()=>{ app.quit() } },
  //   { label: 'Item2', type: 'radio' },
  //   { label: 'Item3', type: 'radio', checked: true },
  //   { label: 'Item4', type: 'radio' }
  // ])
  // tray.setToolTip('极光工作室打卡器.')
  // tray.setContextMenu(contextMenu)

  // 注册file协议的处理程序
  protocol.registerFileProtocol('custom', (request, callback) => {
    const url = request.url.substr(7) // 剥离file://前缀
    const filePath = path.normalize(decodeURI(url)) // 解码url并标准化路径
    fs.readFile(filePath, (err, data) => {
      if (err) {
        console.error(`Failed to read file ${filePath}: ${err}`)
        return callback(-6) // 返回-6表示文件读取失败
      }
      const extension = path.extname(filePath).toLowerCase()
      let mimeType = ''
      if (extension === '.jpg' || extension === '.jpeg') {
        mimeType = 'image/jpeg'
      } else if (extension === '.png') {
        mimeType = 'image/png'
      } else if (extension === '.gif') {
        mimeType = 'image/gif'
      } else {
        mimeType = 'application/octet-stream'
      }
      callback({
        mimeType,
        data
      })
    })
  })

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
  // 双向通信监听
  ipcMain.on('counter-value', (_event, value) => {
    console.log("你干嘛~~") // 将打印到 Node 控制台
  })
// 渲染层-主进程通信
  ipcMain.on('window-operate', windowOperate)
  ipcMain.on('loging', loging)
  createWindow()
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})




// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
