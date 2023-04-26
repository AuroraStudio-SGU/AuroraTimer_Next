import os from "node:os";
import fs from 'fs'
import {join} from 'path'

export const logFilePath = join(os.homedir(), '/AuroraTimer/log')
export const HomePath = join(os.homedir(), '/AuroraTimer')
function log(sate:'info'|'error'|'warning',msg:string) {
  //TODO
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
