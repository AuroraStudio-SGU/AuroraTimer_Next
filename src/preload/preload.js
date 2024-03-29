import {ipcRenderer, contextBridge } from 'electron'
/*
 //原始electron-vite 预加载js
// Custom APIs for renderer
const api = {}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  window.electron = electronAPI
  window.api = api
}
 */

/*
  //electron文档的IPC处理
 */
contextBridge.exposeInMainWorld('electronAPI', {
  //双向监听
  handleCounter: (callback) => ipcRenderer.on('update-counter', callback),
  changeLoginPanel: (callback) => ipcRenderer.on('change-login-panel', callback),
  handleSetting: (callback) => ipcRenderer.on('setting-update', callback),
  saveColorToClipboard:() => ipcRenderer.invoke('save-color-to-clipboard'),
  SaveSetting:(callback) => ipcRenderer.invoke('save-setting',callback),
  loadSetting:(callback) => ipcRenderer.invoke('load-setting', callback),
  getMousePoint:(callback) => ipcRenderer.invoke('get-mouse', callback),
  OnDateFromMain:(callback) =>ipcRenderer.on('receive-data', callback),
  CallbackInformation:(callback) =>ipcRenderer.on('callback-result', callback),
  //渲染→主进程
  windowOperate: (callback) => ipcRenderer.send('window-operate', callback),
  mainLogger: (callback) => ipcRenderer.send('main-logger', callback),
  openFile: (callback) => ipcRenderer.send('open-file', callback),
  login: (callback) => ipcRenderer.send('login', callback),
  openBrowser:(callback) => ipcRenderer.send('open-browser', callback),
  pushDataToMain:(callback) => ipcRenderer.send('send-data-toMain', callback),
  Logout:(callback) => ipcRenderer.send('logout', callback),
  PushSysNotification:(callback) =>ipcRenderer.send('push-sys-notification',callback),
  CloseSysNotification:(callback) =>ipcRenderer.send('close-sys-notification',callback),
  ReloadConfig:(callback) =>ipcRenderer.send('reload-config',callback),

})

