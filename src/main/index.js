import {CallbackEnum} from "../renderer/src/api/interfaces/CallbackEnum";
import {
  app,
  BrowserWindow,
  clipboard,
  dialog,
  globalShortcut,
  ipcMain,
  Menu,
  nativeImage,
  session,
  shell,
  Tray
} from 'electron'
// 4.75
import {join} from 'path'
import {autoUpdater} from "electron-updater"

import {is, optimizer} from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'
import {init, loginByToken} from "../renderer/src/api/API";

import {
  getMousePoint,
  loadSetting,
  openBrowser,
  openFile,
  openSettingFolder,
  SaveSetting,
  WebNotification,
  windowOperate
} from "./function";
import {DefaultSetting} from "../renderer/src/utils/Setting";
import logger from "electron-log";

const startTime = new Date().getTime();

autoUpdater.logger = logger
logger.transports.file.maxSize = 1002430 // 日志最大长度10M
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


const Windows_Main_Width = 1080
const Windows_Main_Height = 720
const iconImg = nativeImage.createFromPath(icon)
let UpdateServerURL;

//更新服务器地址
switch (process.platform) {
  case "darwin":
    UpdateServerURL = "http://192.168.49.66:8000/apps/mac";
    break;
  case "win32":
    UpdateServerURL = "http://192.168.49.66:8000/apps/win";
    break;
  default:
    UpdateServerURL = "http://192.168.49.66:8000/apps";
    break;
}
//↓本地调试用
// UpdateServerURL = "http://localhost:9999/timer/"

// 离线模式，不登录强制进入主页面
const offlineMode = false
//设置updater
autoUpdater.setFeedURL(UpdateServerURL)

let mainWindow;
let loginWindow;
let tray;
let setting;
let AdditionalData;
let isLogin = false
let processTime;
let isAppQuit = false;


async function createLoginWindow() {
  loginWindow = new BrowserWindow({
    width: 1000,
    height: 600,
    icon: icon,
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
  loginWindow.on('close', (event) => {
    if (!isAppQuit) {
      event.preventDefault()
      loginWindow.hide();
    } else {
      loginWindow.close()
    }
  })
  return loginWindow;
}

//登录操作，从登录窗口进入主窗口
function login() {
  logger.log("登录成功")
  let param = {
    startTime,
    processTime,
  }
  mainWindow.webContents.send('change-login-panel', JSON.stringify(param))
  isLogin = true
  loginWindow.hide()
  mainWindow.show()
}

//将选择的颜色放到剪切板里面
async function saveColorToClipboard() {
  // color may be '#0099ff' or '' (pick cancelled with ESC)
  const color = await getColorHexRGB().catch((error) => {
    logger.warn('[ERROR] getColor', error)
    return ''
  })
  logger.log(`getColor: ${color}`)
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
      devTools: {
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
    await mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
    mainWindow.webContents.openDevTools()
  } else {
    await mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
    //DEV setting
  }
  mainWindow.on('close', (event) => {
    if (!isAppQuit) {
      event.preventDefault()
      mainWindow.hide()
    } else {
      mainWindow.close()
    }
  })

  mainWindow.setMinimumSize(Windows_Main_Width, Windows_Main_Height)
}

function mainLogger(event, value) {
  logger.info(value)
}


const enableDevTool = true;

//多开检测
const gotTheLock = app.requestSingleInstanceLock(AdditionalData)
//多开锁
if (!gotTheLock) {
  isAppQuit = true;
  app.quit()
} else {
  app.on('second-instance', (event, commandLine, workingDirectory, additionalData) => {
    // 输出从第二个实例中接收到的数据
    AdditionalData = additionalData
    // 有人试图运行第二个实例，我们应该关注我们的窗口
    if (!mainWindow.isVisible()) {
      mainWindow.show()
    } else {
      focusWindow()
    }
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
//APP 准备阶段
app.whenReady().then(() => {
  // Set app user model id for windows
  app.setAppUserModelId('New·AuroraTimer')
  //设置开发扩展
  if (enableDevTool) {
    const devToolPath = `D:\\DEV\\electron\\AuroraTimer_Next\\VuePlugins`
    session.defaultSession.loadExtension(devToolPath)
  }
  if (app.isPackaged) {
    //检查更新
    try {
      checkForUpdates()
    } catch (e) {
    }
  }
  //创建窗口
  createWindow()
  createLoginWindow()
  //加载配置文件
  LoadSetting()


  //重新设置F12→F9
  globalShortcut.register("F9", () => {
    let window = BrowserWindow.getFocusedWindow();
    if (window) {
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
      label: '打开设置文件', type: 'normal', click: () => {
        openSettingFolder()
      }
    },
    {
      label: '热加载配置文件', type: 'normal', click: () => {
        LoadSetting()
      }
    },
    {
      label: '退出', type: 'normal', click: () => {
        try {
          isAppQuit = true;
          tray.destroy()
          app.quit()
        } catch (e) {
        }
      }
    },
  ])
  tray.setToolTip('新·极光工作室打卡器')
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
        logger.warn('no permission granted yet, try again')
        return ''
      }
      const color = await darwinGetColorHexRGB().catch((error) => {
        logger.warn('[ERROR] getColor', error)
        return ''
      })
      logger.log(`getColor: ${color}`)
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
  ipcMain.on('close-sys-notification', closeNotification)
  ipcMain.on('send-data-toMain', (_event, value) => pushSharedDataToMainWindow(value))
  ipcMain.on('logout', Logout)
  ipcMain.on('push-sys-notification', (_event, options) => {
    SysNotification(options)
  })
  ipcMain.on('reload-config', reloadConfig)

  //设置自启选项
  if (app.isPackaged) {
    app.setLoginItemSettings({
      openAtLogin: setting.OpenAtStart,
      openAsHidden: true
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
  if (!app.isPackaged) {
    //开发环境还是自动切成本地好了，老要自己改
    setting.netWork.host = 'http://localhost:8084'
  }
  //加载API实例
  init(setting.netWork.host, setting.userInfo.token)
  loginWindow.once('ready-to-show', () => {
      //登录判断,开始加载配置文件
      mainWindow.webContents.send('setting-update', JSON.stringify(setting))
      loginWindow.webContents.send('setting-update', JSON.stringify(setting))
      //是否以离线模式强制进入，当然也是为了方便开发测试
      if (offlineMode) {
        login()
      } else {
        tryToLogin()
      }
    }
  )
  processTime = new Date().getTime() - startTime;
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    isAppQuit = true;
    app.quit()
  }
})
//app准备退出后进行的操作
app.on('will-quit', () => {
  if (tray) {
    tray.destroy()
  }
})
//加载配置文件
const LoadSetting = async () => {
  logger.info("加载配置文件")
  setting = loadSetting()
  if (!setting) {
    logger.error("配置文件加载失败,使用默认设置")
    setting = DefaultSetting
  }
}

//聚焦窗口
function focusWindow() {
  if (mainWindow.isVisible()) {
    mainWindow.focus()
  } else {
    mainWindow.show()
  }
}

//检查更新函数
function checkForUpdates() {
  logger.info('Set up event listeners...')
  autoUpdater.on('checking-for-update', () => {
    logger.info('Checking for update...')
  })
  autoUpdater.on('update-available', (info) => {
    logger.info('Update available.')
    WebNotification({
      body: `发现有新版本${info.version},尝试下载`,
      icon: iconImg
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
      detail: `新版本(${info.version})已经下载完成,重启既可更新新版本!你说你想知道更新了什么?,那么怎么不去仓库里面看看呢?`
    }
    dialog.showMessageBox(dialogOpts).then((returnValue) => {
      if (returnValue.response === 0) {
        autoUpdater.quitAndInstall()
      }
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

//向主进程传输数据
function pushSharedDataToMainWindow(obj) {
  mainWindow.webContents.send('receive-data', obj)
}

//封装的在主进程的登录方法
function tryToLogin() {
  if (setting.autoLogin) {
    loginByToken(setting.userInfo.token)
      .then((Response) => {
        let result = Response.data
        if (Response.success) {
          setting.userInfo = result;
          logger.info("登录Token :"+result.token)
          SaveSetting(JSON.stringify(setting))
          pushSharedDataToMainWindow({
            type: "UserInfo",
            data: result
          })
          login()
        } else {
          logger.warn("自动登录失败,重新进入手动登录" + "失败原因:" + Response.msg);
          loginWindow.show()
        }
      })
      .catch((error) => {
        logger.warn("自动登录失败,重新进入手动登录" + "失败原因:" + error);
        loginWindow.show()
      })
  } else {
    loginWindow.show()
  }
}

//登出操作
function Logout() {
  mainWindow.hide()
  loginWindow.show()
  isLogin = false;
}

//用于系统通知的Controller
let ac = null;

//用于主进程发送系统通知
function SysNotification(options) {
  if (ac != null) {
    ac = ac.abort()
  }
  ac = new AbortController();
  options.signal = ac.signal;
  dialog.showMessageBox(options).then(() => {
    mainWindow.webContents.send('callback-result', CallbackEnum.RESTARTTIMER)
  });
}

//abort 系统通知
function closeNotification() {
  if (ac != null) {
    ac.abort("user click other close")
  }
}

//用这个函数退出应用，不然会被锁住没法退出
export function appQuit() {
  isAppQuit = true;
  app.quit()
}

//重启应用
export function AppRestart() {
  if (!app.isPackaged) {
    appQuit();
    return;
  }
  isAppQuit = true;
  app.relaunch();
  app.quit();

}

//从主进程重新加载配置文件,预防某些情况下没正常加载
export async function reloadConfig() {
  await LoadSetting()
  if (setting.userInfo.id === '-1' || setting.userInfo.id) {
    const dialogOpts = {
      type: 'error',
      buttons: ['重启应用', '退出应用'],
      title: '出错了!',
      message: "计时器无法读取到配置文件",
      detail: `请检查配置文件是否正常后尝试重启应用，或联系管理员查看`
    }
    dialog.showMessageBox(dialogOpts).then((returnValue) => {
      if (returnValue.response === 0) {
        AppRestart()
      }
      if (returnValue.response === 1) {
        appQuit()
      }
    })
  } else {
    pushSharedDataToMainWindow({
      type: "Setting",
      data: setting
    })
    mainWindow.hide();
    loginWindow.show();
  }
}
