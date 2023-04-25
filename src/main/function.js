import {BrowserWindow,dialog} from "electron";
import os from "node:os";


export function windowOperate( event ,op ) {
  const webContents = event.sender
  const win = BrowserWindow.fromWebContents(webContents)
  switch (op) {
    case 'Min':
      if(!win.isMinimized())
        win.minimize();
      console.log('最小化')
      break;
    case 'Max':
      console.log(win.isMaximized())
      if(!win.isMaximized()){
        win.maximize();
      } else {
        win.setContentSize(1000, 670); //重新设置窗口客户端的宽高值（例如网页界面），这里win.setSize(x,y)并不生效。
        win.center(); // 窗口居中
      }
      break;
    case 'Close':
      win.close()
      console.log('关闭窗口')
      break
  }
}
export function loging() {
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
