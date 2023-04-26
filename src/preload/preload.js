import {ipcRenderer, contextBridge} from 'electron'
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
  //渲染→主进程
  windowOperate: (callback) => ipcRenderer.send('window-operate', callback),
  openFile: (callback) => ipcRenderer.send('open-file', callback),
  login: (callback) => ipcRenderer.send('login', callback),
  loadSetting:(callback) => ipcRenderer.send('load-setting', callback)
})

