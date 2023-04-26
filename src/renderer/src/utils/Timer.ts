let timePromise: any;

import {TimerStore} from '../stores/Timer.js'

let timeStore

let init:boolean = false
let started:boolean = false
export function Timer(flag: boolean) {
  initTs()
  if (flag == true) {//flag是一个标识，何时计时和何时停止
    if(started) return
    started = true;
    timePromise = setInterval(() => {
      timeStore.TimePlusPlus();
    }, 250);
  } else if (flag == false) {
    started = false;
    //清除计时器
    window.clearInterval(timePromise);
  }
}

const initTs = ()=>{
  if(init) return;
  console.log('Pinia加载')
  timeStore = TimerStore()
  init = true
}
