import {
  app, shell, BrowserWindow,
  Menu, ipcMain, Tray, session
  , nativeImage, clipboard,globalShortcut
} from 'electron'
import {join} from 'path'

import {optimizer, is} from '@electron-toolkit/utils'

import icon from '../../resources/icon.png?asset'
import {loadSetting, openFile, windowOperate} from "./function";

const {
  getColorHexRGB,
  // for more control and customized checks
  DARWIN_IS_PLATFORM_PRE_CATALINA, // darwin only, undefined on other platform
  darwinGetColorHexRGB, // darwin only, throw error on other platform
  darwinGetScreenPermissionGranted, // darwin only, throw error on other platform
  darwinRequestScreenPermissionPopup // darwin only, throw error on other platform
} = require('electron-color-picker')


const Windows_Main_Width = 1000
const Windows_Main_Height = 670


let mainWindow;
let loginWindow;
let tray;

function createLoginWindow() {
  const win = new BrowserWindow({
    width: 650,
    height: 600,
    alwaysOnTop: false,//窗口一直保持在其他窗口前面
    frame: false,
    resizable: false,//用户不可以调整窗口
    center: true, // 窗口居中
    transparent: true,//窗口透明
    show: false,// 显示窗口将没有视觉闪烁（配合下面的ready-to-show事件）
    hasShadow: true,//窗口是否有阴影
    webPreferences: {
      preload: join(__dirname, '../preload/preload.js'),
      devTools: true,//客户端可以打开开发者工具（在客户端打开快捷键：ctrl+shift+i）
    },
  })
  return win;
}

let isLogin = false

function login() {
  console.log("登录成功")
  mainWindow.webContents.send('change-login-panel', 1)
  isLogin = true
  loginWindow.close()
  mainWindow.show()
}

async function saveColorToClipboard() {
  // color may be '#0099ff' or '' (pick cancelled with ESC)
  const color = await getColorHexRGB().catch((error) => {
    console.warn('[ERROR] getColor', error)
    return ''
  })
  console.log(`getColor: ${color}`)
  color && clipboard.writeText(color)
  return color;
}

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: Windows_Main_Width,
    height: Windows_Main_Height,
    show: false,
    icon: icon,
    frame: false,
    transparent: true,
    resizable: true,
    webPreferences: {
      devTools: true,
      preload: join(__dirname, '../preload/preload.js'),
      sandbox: false,
      // 设置内容安全策略
      webSecurity: true,
    },
    // titleBarStyle:'hidden'
  })
  // const menu = Menu.buildFromTemplate([
  //   {
  //     label: 'abcd',
  //     submenu: [
  //       {
  //         click: () => mainWindow.webContents.send('update-counter', 1),
  //         label: 'Increment',
  //       },
  //       {
  //         click: () => mainWindow.webContents.send('update-counter', -1),
  //         label: 'Decrement',
  //       }
  //     ]
  //   }
  // ])
  // Menu.setApplicationMenu(menu)
  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return {action: 'deny'}
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
    mainWindow.webContents.openDevTools()
    console.log("开发模式！")
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
    //DEV setting

  }
  mainWindow.setMinimumSize(700, 550)


  // const globalStore = GlobalStore()

  //子窗口加载
  mainWindow.on('ready-to-show', () => {
    if (isLogin) {
      mainWindow.show()
    } else {
      loginWindow = createLoginWindow()
      if (app.isPackaged) {
        loginWindow.loadFile(join(__dirname, '../renderer/index.html'), {
          hash: 'login'
        })
      } else {
        //127.0.0.1 → localhost （in some case someone can't connect local ip)
        const winUrl = 'http://localhost:5173/#/login';
        loginWindow.loadURL(winUrl)
      }
      loginWindow.on('ready-to-show', () => {
        loginWindow.show()
      })
      loginWindow.on('close', () => {
        if (!isLogin) {
          app.quit()
        }
      })
    }
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  app.setAppUserModelId('新·极光工作室打卡器')

  //设置开发扩展
  // const devToolPath = `C:\\Users\\Time\\AppData\\Local\\Google\\Chrome\\User Data\\Default\\Extensions\\nhdogjmejiglipccpnnnanhbledajbpd\\6.5.0_0`
  // session.defaultSession.loadExtension(devToolPath)

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  // 设置系统托盘
  const iconImg = nativeImage.createFromPath(icon)
  console.log(iconImg.isEmpty())
  tray = new Tray(iconImg)
  const contextMenu = Menu.buildFromTemplate([
    {
      label: '退出', type: 'normal', click: () => {
        app.quit()
        tray.destroy()
      }
    },
    {label: 'Item2', type: 'radio'},
    {label: 'Item3', type: 'radio', checked: true},
    {label: 'Item4', type: 'radio'}
  ])
  tray.setToolTip('极光工作室打卡器.')
  tray.setContextMenu(contextMenu)

  // 注册file协议的处理程序
  // protocol.registerFileProtocol('custom', (request, callback) => {
  //   const url = request.url.substr(7) // 剥离file://前缀
  //   const filePath = path.normalize(decodeURI(url)) // 解码url并标准化路径
  //   fs.readFile(filePath, (err, data) => {
  //     if (err) {
  //       console.error(`Failed to read file ${filePath}: ${err}`)
  //       return callback(-6) // 返回-6表示文件读取失败
  //     }
  //     const extension = path.extname(filePath).toLowerCase()
  //     let mimeType = ''
  //     if (extension === '.jpg' || extension === '.jpeg') {
  //       mimeType = 'image/jpeg'
  //     } else if (extension === '.png') {
  //       mimeType = 'image/png'
  //     } else if (extension === '.gif') {
  //       mimeType = 'image/gif'
  //     } else {
  //       mimeType = 'application/octet-stream'
  //     }
  //     callback({
  //       mimeType,
  //       data
  //     })
  //   })
  // })

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
  //取色器特性支持
  if (process.platform === 'darwin' && !DARWIN_IS_PLATFORM_PRE_CATALINA) {
    const darwinScreenPermissionSample = async () => {
      const isGranted = await darwinGetScreenPermissionGranted() // initial check
      console.log('darwinGetScreenPermissionGranted:', isGranted)
      if (!isGranted) { // request user for permission, no result, and will not wait for user click
        await darwinRequestScreenPermissionPopup()
        console.warn('no permission granted yet, try again')
        return ''
      }
      const color = await darwinGetColorHexRGB().catch((error) => {
        console.warn('[ERROR] getColor', error)
        return ''
      })
      console.log(`getColor: ${color}`)
      color && clipboard.writeText(color)
    }
  }
  //截图功能设置



  // 双向通信监听
  ipcMain.on('counter-value', (_event, value) => {
    console.log("你干嘛~~") // 将打印到 Node 控制台
  })
  ipcMain.handle('save-color-to-clipboard', saveColorToClipboard)
  // 渲染层-主进程通信
  ipcMain.on('window-operate', windowOperate)
  ipcMain.on('open-file', openFile)
  ipcMain.on('login', login)
  ipcMain.on('load-setting', loadSetting)
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
//app准备退出后进行的操作
app.on('will-quit', () => {
  tray.destroy()
})


// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
