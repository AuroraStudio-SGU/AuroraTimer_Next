const startTime = new Date().getTime();
import {app, BrowserWindow, clipboard, dialog,session , ipcMain, Menu, nativeImage, shell, Tray ,globalShortcut} from 'electron'
// 4.75
import {join} from 'path'
import {autoUpdater} from "electron-updater"

import {is, optimizer} from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'
import {loginByToken,init} from "../renderer/src/api/API";

import {
  getMousePoint,
  loadSetting,
  openBrowser,
  openFile,
  SaveSetting,
  SysNotification,
  windowOperate
} from "./function";
import {DefaultSetting} from "../renderer/src/utils/Setting";
import logger from "electron-log";

autoUpdater.logger = logger
logger.transports.file.maxSize = 1002430 // 10M
logger.transports.file.format = '[{y}-{m}-{d} {h}:{i}:{s}.{ms}][{level}]{scope} {text}'
logger.transports.console.format = '[{y}-{m}-{d} {h}:{i}:{s}.{ms}][{level}]{scope} {text}'
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
const iconImg = nativeImage.createFromPath(icon)
const UpdateServerURL = "http://localhost:9999/timer/"
const offlineMode = false


let mainWindow;
let loginWindow;
let tray;
let setting;
let AdditionalData;
let isLogin = false
let processTime;
//设置updater
autoUpdater.setFeedURL(UpdateServerURL)
function createLoginWindow() {
  return new BrowserWindow({
    width: 1000,
    height: 600,
    icon:icon,
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

function login() {
  console.log("登录成功")
  let param = {
    startTime,
    processTime,
  }
  mainWindow.webContents.send('change-login-panel', JSON.stringify(param))
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
async function createWindow() {
  mainWindow = new BrowserWindow({
    width: Windows_Main_Width,
    height: Windows_Main_Height,
    show: false,
    icon: icon,
    frame: false,
    transparent: true,
    resizable: true,
    webPreferences: {
      preload: join(__dirname, '../preload/preload.js'),
      sandbox: false,
      // 设置内容安全策略
      webSecurity: true,
      devTools:{
        enabled: true,
        hotkeys: {
          devTools: 'F12'
        }
      },
    },
  })
  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return {action: 'deny'}
  })
  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    console.log("开发模式")
    await mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
    mainWindow.webContents.openDevTools()
  } else {
    await mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
    //DEV setting
  }
  mainWindow.setMinimumSize(996, 635)
}

function mainLogger(event,value){
  logger.info(value)
}


const enableDevTool = true;
// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  app.setAppUserModelId('New·AuroraTimer')

  //设置开发扩展
  if(enableDevTool){
    const devToolPath = `D:\\DEV\\electron\\AuroraTimer_Next\\VuePlugins`
    session.defaultSession.loadExtension(devToolPath)
  }




  if (app.isPackaged) {
    //检查更新
    checkForUpdates()
  }
  //创建窗口
  createWindow()
  loginWindow = createLoginWindow()
  //多开检测
  const gotTheLock = app.requestSingleInstanceLock(AdditionalData)
  //多开锁
  if (!gotTheLock) {
    app.quit()
  } else {
    app.on('second-instance', (event, commandLine, workingDirectory, additionalData) => {
      // 输出从第二个实例中接收到的数据
      AdditionalData = additionalData

      // 有人试图运行第二个实例，我们应该关注我们的窗口
      focusWindow()
    })
  }
  //加载配置文件
  LoadSetting()




  //重新设置F12→F9
  globalShortcut.register("F9",()=>{
    let window = BrowserWindow.getFocusedWindow();
    if(window){
      window.webContents.toggleDevTools();
    }
  })



  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })


  // 设置系统托盘
  tray = new Tray(iconImg)
  const contextMenu = Menu.buildFromTemplate([
    {
      label: '退出', type: 'normal', click: () => {
        app.quit()
        tray.destroy()
      }
    },
  ])
  tray.setToolTip('极光工作室打卡器')
  tray.setContextMenu(contextMenu)
  tray.on('double-click', focusWindow)

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


  // 双向通信监听
  ipcMain.handle('save-color-to-clipboard', saveColorToClipboard)
  ipcMain.handle('save-setting', (_event, value) => {
    return SaveSetting(value)
  })
  ipcMain.handle('load-setting', loadSetting)
  ipcMain.handle('get-mouse', getMousePoint)
  // 渲染层-主进程通信
  ipcMain.on('window-operate', windowOperate)
  ipcMain.on('main-logger', mainLogger)
  ipcMain.on('open-file', openFile)
  ipcMain.on('login', login)
  ipcMain.on('open-browser', openBrowser)
  ipcMain.on('send-data-toMain', (_event,value)=> pushSharedDataToMainWindow(value))



  //设置自启选项
  if(app.isPackaged){
    app.setLoginItemSettings({
      openAtLogin:setting.OpenAtStart,
      openAsHidden:true
    })
  }

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

  //加载API实例
  init(setting.netWork.host,setting.userInfo.token)
  loginWindow.once('ready-to-show', () => {
    //登录判断,开始加载配置文件
    mainWindow.webContents.send('setting-update', JSON.stringify(setting))
    loginWindow.webContents.send('setting-update', JSON.stringify(setting))
    //是否以离线模式强制进入，当然也是为了方便开发测试
    if(offlineMode){
      login()
    }else {
      if(setting.autoLogin){
        loginByToken(setting.userInfo.token)
          .then((Response)=>{
          if(Response.success){
            let result = Response.data
            console.log(result)
            setting.userInfo = {
              id:result.id,
              name:result.name,
              "WeekTime":result.currentWeekTime,
              "isAdmin":result.admin,
              token:result.token,
            }
            SaveSetting(JSON.stringify(setting))
            pushSharedDataToMainWindow({
              type:"UserInfo",
              data:result
            })
            login()
          }else {
            logger.warn("自动登录失败,重新进入手动登录"+"失败原因:"+Response.msg);
            loginWindow.show()
          }
        })
          .catch((error)=>{
            logger.warn("自动登录失败,重新进入手动登录"+"失败原因:"+error);
            loginWindow.show()
          })
      }else {
        loginWindow.show()
      }
    }

  })
  loginWindow.on('close', () => {
    if (!isLogin) {
      app.quit()
    }
  })
  //主窗口监听事件
  mainWindow.on('session-end', () => {
    app.quit()
  })
  processTime = new Date().getTime() - startTime;
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

const LoadSetting = async () => {
  console.log("加载配置文件")
  setting = loadSetting()
  if (!setting) {
    console.error("配置文件加载失败,使用默认设置")
    setting = DefaultSetting
  }
}

function focusWindow() {
  if (mainWindow) {
    if (mainWindow.isMaximized()) {
      mainWindow.setFullScreen(false)
    }
    mainWindow.focus()
  }
}

function checkForUpdates() {
  logger.info('Set up event listeners...')
  autoUpdater.on('checking-for-update', () => {
    logger.info('Checking for update...')
  })
  autoUpdater.on('update-available', (info) => {
    logger.info('Update available.')
    SysNotification({
      body:`发现有新版本${info.version},尝试下载`,
      icon:iconImg
    })
  })
  autoUpdater.on('update-not-available', (info) => {
    logger.info('Update not available.')
  })
  autoUpdater.on('error', (err) => {
    logger.error('Error in auto-updater.' + err)
  })
  autoUpdater.on('download-progress', (progressObj) => {
    let msg = "Download speed: " + progressObj.bytesPerSecond
    msg = msg + ' - Downloaded ' + progressObj.percent + '%'
    msg = msg + ' (' + progressObj.transferred + "/" + progressObj.total + ')'
    logger.info(msg)
  })
  autoUpdater.on('update-downloaded', (info) => {
    logger.info('Update downloaded.')

    // The update will automatically be installed the next time the
    // app launches. If you want to, you can force the installation
    // now:
    const dialogOpts = {
      type: 'info',
      buttons: ['重启更新', '等下再说'],
      title: '是否更新?',
      message: process.platform === 'win32' ? info.releaseNotes : info.releaseName,
      detail: `新版本(${info.version})已经下载完成,重启既可更新新版本!`
    }

    dialog.showMessageBox(dialogOpts).then((returnValue) => {
      if (returnValue.response === 0) autoUpdater.quitAndInstall()
    })
  })

  // More properties on autoUpdater, see https://www.electron.build/auto-update#AppUpdater
  //autoUpdater.autoDownload = true
  //autoUpdater.autoInstallOnAppQuit = true

  // No debugging! Check main.log for details.
  // Ready? Go!
  logger.info('checkForUpdates() -- begin')
  try {
    //autoUpdater.setFeedURL('')
    autoUpdater.checkForUpdates()
    //autoUpdater.checkForUpdatesAndNotify()
  } catch (error) {
    logger.error(error)
  }
  logger.info('checkForUpdates() -- end')
}

function pushSharedDataToMainWindow(obj) {
    mainWindow.webContents.send('receive-data',obj)
}
