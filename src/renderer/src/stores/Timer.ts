import { defineStore } from 'pinia'
import {ref} from "vue";
import {SecondToString} from "../utils/TimeUtil";
interface ProgressColor {
  small:{
    start:string,
    end:string,
  },
  medium:{
    start:string,
    end:string,
  },
  big:{
    start:string,
    end:string,
  }
}

const defaultColor:ProgressColor = {
  small:{
    start:'#fff1eb',
    end:'#ace0f9',
  },
  medium:{
    start:'#a8edea',
    end:'#fed6e3',
  },
  big:{
    start:'#a6c0fe',
    end:'#f68084',
  }
}

// 第一个参数是应用程序中 store 的唯一 id
export const TimerStore = defineStore('timer', {
  // other options...
  state:()=>({
    percent:ref(0),
    size:ref(0),
    time:ref(0),
    isStarted:ref(false),
    progressColor:ref(defaultColor),
    inited:ref(false),
    timer:'',
  }),
  getters:{
    getPercent(state){
      return state.percent
    },
    getTimeStr(state){
      return SecondToString(state.time)
    },
    getTimerProgress(state){
      return{
        big: Number((state.time / 864).toFixed(2)),
        middle: Number((state.time / 864).toFixed(2)) - 100 < 0 ? 0 : (state.time / 864).toFixed(2) - 100,
        little: Number((state.time / 864).toFixed(2)) - 200 < 0 ? 0 : (state.time / 864).toFixed(2) - 200
      }
    }
  },
  actions:{
    TimePlusPlus(){
      this.time+=300;
    },
    clearTime(){
      this.time = 0;
    },
    OpenTimer(){
      this.isStarted = true
    },
    CloseTimer(){
      this.isStarted = false
    }
  }
})
