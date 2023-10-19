import {BrowserWindow, dialog, Notification, screen, shell} from "electron";
import os from "node:os";
import fs from 'fs'
import {join} from 'path'
import {checkAndMakeHomeDir} from "../renderer/src/utils/LogUtil";
import {DefaultSetting, SettingFile} from "../renderer/src/utils/Setting";
import NotificationConstructorOptions = Electron.NotificationConstructorOptions;


let settingFilePath = join(os.homedir(), '/AuroraTimer/setting.json')

let SettingObject

//stuip api
let windowState: boolean = false

export function windowOperate(event, op) {
  const webContents = event.sender
  const win = BrowserWindow.fromWebContents(webContents)
  switch (op) {
    case 'Min':
      if (!win.isMinimized())
        win.minimize();
      break;
    case 'Max':
      if (win.isFullScreen() || windowState) {
        win.setFullScreen(false)
        windowState = false
      } else {
        win.setFullScreen(true)
        windowState = true
      }
      break;
    case 'Close':
      win.hide()
      break
  }
}

export function loadSetting(): SettingFile {
  let curSetting: SettingFile
  let buffer
  try {
    buffer = fs.readFileSync(settingFilePath)
  } catch (e) {
    if (e.errno === -4058) {
      checkAndMakeHomeDir()
      try {
        //载入默认的用户信息和配置信息
        fs.writeFileSync(settingFilePath, JSON.stringify(DefaultSetting, null, 2))
        buffer = SettingObject
      } catch (e) {
        console.error("创建文件失败", e)
        buffer = ''
      }
    } else {
      buffer = ''
    }
  }
  if (buffer) {
    //加载出设置内容
    curSetting = JSON.parse(buffer.toString())
    return curSetting
  } else return DefaultSetting
}

export function SaveSetting(setting: string): boolean {
  try {
    fs.writeFileSync(settingFilePath, JSON.stringify(JSON.parse(setting), null, 2))
  } catch (e) {
    console.error(e)
    return false
  }
  return true
}

export function openFile() {
  dialog.showOpenDialog({
    title: '请选择你喜欢的照片',
    //过滤文件后缀
    filters: [{
      name: 'img',
      extensions: ['jpg', 'png']
    }],
    //打开按钮
    buttonLabel: '确定',

    //回调结果渲染到img标签上
  }).then(result => {
    console.log(result)
    // fs.writeFileSync(os.homedir(),result.filePath[0])
  }).catch(err => {
    console.log(err)
  })
}

export function openBrowser(event, URL: string) {
  shell.openExternal(URL)
}

export function getMousePoint() {
  return screen.getCursorScreenPoint()
}

export function SysNotification(options?: NotificationConstructorOptions) {
  new Notification(options).show()
}




