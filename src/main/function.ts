import {BrowserWindow, dialog} from "electron";
import os from "node:os";
import process from "node:process";
import fs from 'fs'
import {join} from 'path'
import {checkAndMakeHomeDir, HomePath} from "../renderer/src/utils/LogUtil";
import {Setting, userInfo} from "../renderer/src/utils/Setting";


let settingFilePath

let SettingObject



let isMaximized = false

export function windowOperate(event, op) {
  const webContents = event.sender
  const win = BrowserWindow.fromWebContents(webContents)
  switch (op) {
    case 'Min':
      if (!win.isMinimized())
        win.minimize();
      console.log('最小化')
      break;
    case 'Max':
      if (!isMaximized) {
        win.maximize();
        isMaximized = true
      } else {
        // win.restore()
        win.setContentSize(1000, 670); //重新设置窗口客户端的宽高值（例如网页界面），这里win.setSize(x,y)并不生效。
        win.center(); // 窗口居中
        isMaximized = false
      }
      break;
    case 'Close':
      win.close()
      console.log('关闭窗口')
      break
  }
}

export function loadSetting() {
  //载入用户信息和配置信息
  SettingObject = Object.assign(userInfo,Setting)
  settingFilePath = join(os.homedir(), '/AuroraTimer/setting.json')
  fs.readFile(settingFilePath, (err, data) => {
    if (err) {
      if (err.errno === -4058) { //没有就创建
        console.log("尝试创建文件", HomePath)
        checkAndMakeHomeDir()
        try {
          fs.writeFileSync(settingFilePath, JSON.stringify(SettingObject,null,2))
        } catch (e) {
          console.error("创建文件失败",e)
        }
        console.log("创建完成")
      }
    } else {
      console.log(data)
    }
  });
}

export function openFile() {
  console.log("DIR:"+os.tmpdir())
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


