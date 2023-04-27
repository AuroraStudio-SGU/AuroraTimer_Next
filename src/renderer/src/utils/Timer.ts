let timer: any;

import {TimerStore} from '../stores/Timer.js'

let timeStore

let init:boolean = false
let started:boolean = false
export function Timer(flag: boolean) {
  initTs() //初始化计时器
  if (flag) {//flag是一个标识，何时计时和何时停止
    if(started) return
    started = true;
    timer = setInterval(() => {
      timeStore.TimePlusPlus();
    }, 250);
  } else if (flag == false) {
    started = false;
    //清除计时器
    window.clearInterval(timer);
  }
}

const initTs = ()=>{
  if(init) return;
  timeStore = TimerStore()
  init = true
}
