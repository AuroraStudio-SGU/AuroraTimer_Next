import {app, BrowserWindow, clipboard, ipcMain, Menu, nativeImage, shell, Tray, session} from 'electron'
import {join} from 'path'

import {is, optimizer} from '@electron-toolkit/utils'

import icon from '../../resources/icon.png?asset'
import {loadSetting, openBrowser, openFile, SaveSetting, windowOperate} from "./function";
import * as SettingJS from "../renderer/src/utils/Setting";

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
  return new BrowserWindow({
    width: 1000,
    height: 600,
    alwaysOnTop: false,//窗口一直保持在其他窗口前面
    frame: false,
    resizable: false,//用户不可以调整窗口
    center: true, // 窗口居中
    transparent: true,//窗口透明
    show: false,// 显示窗口将没有视觉闪烁（配合下面的ready-to-show事件）
    hasShadow: false,//窗口是否有阴影
    webPreferences: {
      preload: join(__dirname, '../preload/preload.js'),
      devTools: true,//客户端可以打开开发者工具（在客户端打开快捷键：ctrl+shift+i）
    },
  });
}

let isLogin = false

function login() {
  console.log("登录成功")
  mainWindow.webContents.send('change-login-panel', 1)
  isLogin = true
  loginWindow.close()
  // setTimeout(()=>{mainWindow.show()},200)
  mainWindow.once('ready-to-show',()=>{
    mainWindow.show()
  })
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
  })
  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return {action: 'deny'}
  })
  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
    mainWindow.webContents.openDevTools()
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
    //DEV setting
  }
  mainWindow.setMinimumSize(700, 550)

}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  app.setAppUserModelId('新·极光工作室打卡器')

  //设置开发扩展
  // const devToolPath = `C:\\Users\\Time\\AppData\\Local\\Google\\Chrome\\User Data\\Default\\Extensions\\nhdogjmejiglipccpnnnanhbledajbpd\\6.5.0_1`
  // session.defaultSession.loadExtension(devToolPath)

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  // 设置系统托盘
  const iconImg = nativeImage.createFromPath(icon)
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


  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
  //取色器特性支持
  if (process.platform === 'darwin' && !DARWIN_IS_PLATFORM_PRE_CATALINA) {
    const darwinScreenPermissionSample = async () => {
      const isGranted = await darwinGetScreenPermissionGranted() // initial check
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
  ipcMain.handle('save-color-to-clipboard', saveColorToClipboard)
  ipcMain.handle('save-setting', (_event,value)=>{
    return SaveSetting(value)
  })
  ipcMain.handle('load-setting', loadSetting)
  // 渲染层-主进程通信
  ipcMain.on('window-operate', windowOperate)
  ipcMain.on('open-file', openFile)
  ipcMain.on('login', login)
  ipcMain.on('open-browser', openBrowser)

  //创建窗口
  createWindow()
  loginWindow = createLoginWindow()

  //登录判断,开始加载配置文件
  LoadSetting()
  //生产环境跳转
  if (app.isPackaged) {
    loginWindow.loadFile(join(__dirname, '../renderer/index.html'), {
      hash: 'login'
    })
  } else {
    //开发环境跳转
    //127.0.0.1 → localhost (in some case someone can't connect local ip)
    const winUrl = 'http://localhost:5173/#/login';
    loginWindow.loadURL(winUrl)
  }
  loginWindow.once('ready-to-show', () => {
    loginWindow.show()
  })
  loginWindow.on('close', () => {
    if (!isLogin) {
      app.quit()
    }
  })
  //主窗口监听事件
  mainWindow.on('session-end',()=>{
    app.quit()
  })
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

const LoadSetting = async () =>  {
  console.log("加载配置文件")
  let setting = loadSetting()
  if(setting){
    SettingJS.Setting = setting
  }else {
    console.error("配置文件加载失败,使用默认设置")
    SettingJS.Setting = SettingJS.DefaultSetting
  }
  mainWindow.webContents.send('setting-update',JSON.stringify(SettingJS.Setting))
}
