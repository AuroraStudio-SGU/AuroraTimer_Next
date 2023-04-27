import os from "node:os";
import fs from 'fs'
import {join} from 'path'
import {currentDate} from "./TimeUtil";

export const logFilePath = join(os.homedir(), '/AuroraTimer/log')
export const HomePath = join(os.homedir(), '/AuroraTimer')



function log(sate:'info'|'error'|'warning',msg:string) {
  checkPath('/log')
  const dateTime = currentDate()
  const logFile = join(logFilePath,'log-'+dateTime.Date+'.log')
  try{
    fs.accessSync(logFile)//尝试加载日志文件
    let message = '[' + dateTime.Time + ']' +'['+ sate +']' +' ' + msg
    fs.appendFileSync(logFile,message)
  }catch (e) {
    console.error(e)
  }
}

export function checkAndMakeHomeDir() {
  try {
    fs.accessSync(HomePath)
  }catch (e) {
    try {
      fs.mkdirSync(HomePath)
    } catch (e) {
      console.error("创建目录失败", e)
    }
  }
}

const checkPath = (path:string)=>{
  try {
    fs.accessSync(join(HomePath,path))
  }catch (e) {
    try {
      fs.mkdirSync(join(HomePath,path))
    } catch (e) {
      console.error("创建目录失败", e)
    }
  }
}
