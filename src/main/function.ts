import {BrowserWindow, dialog, Notification, screen, shell} from "electron";
import os from "node:os";
import fs from 'fs'
import {join} from 'path'
import {DefaultSetting, SettingFile} from "../renderer/src/utils/Setting";
import logger from "electron-log";
import {appQuit} from './index.js'
import NotificationConstructorOptions = Electron.NotificationConstructorOptions;
import MessageBoxOptions = Electron.MessageBoxOptions;

let HomePath;

//专门给苹果做特判.jpg
if (os.platform() === 'darwin') {
    HomePath = join(os.homedir(), 'Documents');
} else {
    HomePath = os.homedir();
}

export let settingDirectory = join(HomePath, 'AuroraTimer')
export let settingFilePath = join(settingDirectory, 'setting.json')
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
    let buffer:any
    try {
        buffer = fs.readFileSync(settingFilePath)
    } catch (e) {
        logger.info("正在创建默认配置文件")
        buffer = createSettingFile()
    }
    if (buffer) {
        //加载出设置内容
        try {
            curSetting = JSON.parse(buffer.toString())
            logger.info("配置文件版本: "+curSetting.version)
            return curSetting
        } catch (e) {
            logger.warn("文件损坏，创建新的配置文件")
        }
    }
    buffer = createSettingFile()
    curSetting = JSON.parse(buffer.toString())
    return curSetting;
}

export function createSettingFile() {
    try {
        fs.mkdirSync(settingDirectory, {recursive: true});
        //写入配置信息
        fs.writeFileSync(settingFilePath, JSON.stringify(DefaultSetting, null, 2))
        return fs.readFileSync(settingFilePath)
    } catch (e) {
        logger.error("创建文件失败", e)
        const dialogOpts: MessageBoxOptions = {
            type: 'error',
            buttons: ['打开配置文件目录'],
            title: '致密错误',
            message: '配置文件创建失败，程序无法继续运行下去',
            detail: '你可以选择打开文件目录,然后程序将强制退出'
        }
        const cb = () => {
            shell.openPath(settingDirectory)
        }
        internalSysMessage(dialogOpts, cb)
        appQuit()
    }
}

export function SaveSetting(setting: string): boolean {
    try {
        fs.writeFileSync(settingFilePath, JSON.stringify(JSON.parse(setting), null, 2))
    } catch (e) {
        logger.error(e)
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
        logger.log(result)
        // fs.writeFileSync(os.homedir(),result.filePath[0])
    }).catch(err => {
        logger.log(err)
    })
}

export function openBrowser(event, URL: string) {
    shell.openExternal(URL)
}

export function getMousePoint() {
    return screen.getCursorScreenPoint()
}

type CallbackOnClick = (returnValue?: any) => void;

export function WebNotification(options?: NotificationConstructorOptions, callback?: CallbackOnClick) {
    let notification = new Notification(options);
    notification.show();
    if(callback){
      notification.on('click', callback)
    }
}

export function internalSysMessage(options?: MessageBoxOptions, onClickEvent?: CallbackOnClick) {
    dialog.showMessageBox(options).then((returnValue) => {
        onClickEvent(returnValue);
    })
}
export function openSettingFolder() {
    shell.showItemInFolder(settingFilePath)
}






