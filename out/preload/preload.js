"use strict";
const electron = require("electron");
electron.contextBridge.exposeInMainWorld("electronAPI", {
  //双向监听
  handleCounter: (callback) => electron.ipcRenderer.on("update-counter", callback),
  changeLoginPanel: (callback) => electron.ipcRenderer.on("change-login-panel", callback),
  //渲染→主进程
  windowOperate: (callback) => electron.ipcRenderer.send("window-operate", callback),
  openFile: (callback) => electron.ipcRenderer.send("open-file", callback),
  login: (callback) => electron.ipcRenderer.send("login", callback),
  loadSetting: (callback) => electron.ipcRenderer.send("load-setting", callback)
});
