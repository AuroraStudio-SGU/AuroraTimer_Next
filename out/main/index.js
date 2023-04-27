"use strict";
const electron = require("electron");
const path = require("path");
const utils = require("@electron-toolkit/utils");
const os = require("node:os");
require("node:process");
const fs = require("fs");
const pinia = require("pinia");
const vue = require("vue");
const icon = path.join(__dirname, "../../resources/icon.png");
path.join(os.homedir(), "/AuroraTimer/log");
const HomePath = path.join(os.homedir(), "/AuroraTimer");
function checkAndMakeHomeDir() {
  try {
    fs.accessSync(HomePath);
  } catch (e) {
    try {
      fs.mkdirSync(HomePath);
    } catch (e2) {
      console.error("创建目录失败", e2);
    }
  }
}
let settingFilePath;
const defaultSetting = {
  uid: "21125023044",
  name: "DAY",
  WeekTime: 96e4,
  isAdmin: true
};
function windowOperate(event, op) {
  const webContents = event.sender;
  const win = electron.BrowserWindow.fromWebContents(webContents);
  switch (op) {
    case "Min":
      if (!win.isMinimized())
        win.minimize();
      console.log("最小化");
      break;
    case "Max":
      console.log(win.isMaximized());
      if (!win.isMaximized()) {
        win.maximize();
      } else {
        win.setContentSize(1e3, 670);
        win.center();
      }
      break;
    case "Close":
      win.close();
      console.log("关闭窗口");
      break;
  }
}
function loadSetting() {
  settingFilePath = path.join(os.homedir(), "/AuroraTimer/setting.json");
  console.log(settingFilePath);
  fs.readFile(settingFilePath, (err, data) => {
    if (err) {
      if (err.errno === -4058) {
        console.log("尝试创建文件", HomePath);
        checkAndMakeHomeDir();
        try {
          fs.writeFileSync(settingFilePath, JSON.stringify(defaultSetting, null, 2));
        } catch (e) {
          console.error("创建文件失败", e);
        }
        console.log("创建完成");
      }
    } else {
      console.log(data);
    }
  });
}
function openFile() {
  console.log("DIR:" + os.tmpdir());
  electron.dialog.showOpenDialog({
    title: "请选择你喜欢的照片",
    //过滤文件后缀
    filters: [{
      name: "img",
      extensions: ["jpg", "png"]
    }],
    //打开按钮
    buttonLabel: "确定"
    //回调结果渲染到img标签上
  }).then((result) => {
    console.log(result);
  }).catch((err) => {
    console.log(err);
  });
}
pinia.defineStore("main", {
  // other options...
  state: () => {
    return {
      loginPanel: vue.ref(false)
    };
  },
  getters: {},
  actions: {
    changeLoginPanel() {
      this.loginPanel = true;
    }
  }
});
const Windows_Main_Width = 1e3;
const Windows_Main_Height = 670;
let mainWindow;
let loginWindow;
let tray;
function createLoginWindow() {
  const win = new electron.BrowserWindow({
    width: 1e3,
    height: 750,
    alwaysOnTop: false,
    //窗口一直保持在其他窗口前面
    frame: false,
    resizable: false,
    //用户不可以调整窗口
    center: true,
    // 窗口居中
    transparent: false,
    //窗口透明
    show: false,
    // 显示窗口将没有视觉闪烁（配合下面的ready-to-show事件）
    hasShadow: true,
    //窗口是否有阴影
    webPreferences: {
      preload: path.join(__dirname, "../preload/preload.js"),
      devTools: true
      //客户端可以打开开发者工具（在客户端打开快捷键：ctrl+shift+i）
    }
  });
  return win;
}
function login() {
  console.log("登录成功");
  mainWindow.webContents.send("change-login-panel", 1);
  loginWindow.close();
  mainWindow.show();
}
function createWindow() {
  mainWindow = new electron.BrowserWindow({
    width: Windows_Main_Width,
    height: Windows_Main_Height,
    show: false,
    icon,
    frame: false,
    transparent: true,
    resizable: true,
    webPreferences: {
      devTools: true,
      preload: path.join(__dirname, "../preload/preload.js"),
      sandbox: false,
      // 设置内容安全策略
      webSecurity: true
    }
    // titleBarStyle:'hidden'
  });
  const menu = electron.Menu.buildFromTemplate([
    {
      label: "abcd",
      submenu: [
        {
          click: () => mainWindow.webContents.send("update-counter", 1),
          label: "Increment"
        },
        {
          click: () => mainWindow.webContents.send("update-counter", -1),
          label: "Decrement"
        }
      ]
    }
  ]);
  electron.Menu.setApplicationMenu(menu);
  mainWindow.webContents.setWindowOpenHandler((details) => {
    electron.shell.openExternal(details.url);
    return { action: "deny" };
  });
  if (utils.is.dev && process.env["ELECTRON_RENDERER_URL"]) {
    mainWindow.loadURL(process.env["ELECTRON_RENDERER_URL"]);
    mainWindow.webContents.openDevTools();
    console.log("开发模式！");
  } else {
    mainWindow.loadFile(path.join(__dirname, "../renderer/index.html"));
  }
  mainWindow.setMinimumSize(700, 550);
  mainWindow.on("ready-to-show", () => {
    {
      if (!electron.app.isPackaged)
        ;
      loginWindow = createLoginWindow();
      loginWindow.loadFile(path.join(__dirname, "../renderer/index.html"), {
        hash: "login"
      });
      loginWindow.on("ready-to-show", () => {
        loginWindow.show();
      });
    }
  });
}
electron.app.whenReady().then(() => {
  electron.app.setAppUserModelId("新·极光工作室打卡器");
  electron.app.on("browser-window-created", (_, window) => {
    utils.optimizer.watchWindowShortcuts(window);
  });
  const iconImg = electron.nativeImage.createFromPath(icon);
  console.log(iconImg.isEmpty());
  tray = new electron.Tray(iconImg);
  const contextMenu = electron.Menu.buildFromTemplate([
    {
      label: "退出",
      type: "normal",
      click: () => {
        electron.app.quit();
        tray.destroy();
      }
    },
    { label: "Item2", type: "radio" },
    { label: "Item3", type: "radio", checked: true },
    { label: "Item4", type: "radio" }
  ]);
  tray.setToolTip("极光工作室打卡器.");
  tray.setContextMenu(contextMenu);
  electron.app.on("activate", function() {
    if (electron.BrowserWindow.getAllWindows().length === 0)
      createWindow();
  });
  electron.ipcMain.on("counter-value", (_event, value) => {
    console.log("你干嘛~~");
  });
  electron.ipcMain.on("window-operate", windowOperate);
  electron.ipcMain.on("open-file", openFile);
  electron.ipcMain.on("login", login);
  electron.ipcMain.on("load-setting", loadSetting);
  createWindow();
});
electron.app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    electron.app.quit();
    tray.destroy();
  }
});
