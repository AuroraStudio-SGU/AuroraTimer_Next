import { defineStore } from 'pinia'
import {ref} from "vue";
import {SecondToString} from "../utils/TimeUtil";


// 第一个参数是应用程序中 store 的唯一 id
export const TimerStore = defineStore('timer', {
  // other options...
  state:()=>({
    percent:ref(0),
    size:ref(0),
    time:ref(0),
    isStarted:ref(false),
    timer:{} as Worker,
  }),
  getters:{
    getPercent(state){
      return state.percent
    },
    getTimeStr(state){
      return SecondToString(state.time)
    },
    getTimerProgress(state){
      let percentage = Number((state.time / 864).toFixed(2))
      return{
        big: percentage > 100 ? 100 : percentage,
        middle: percentage - 100 < 0 ? 0 : percentage - 100 > 100 ? 100 : percentage -100,
        little: percentage - 200 < 0 ? 0 : percentage - 200 > 100 ? 100 : percentage -200,
      }
    }
  },
  actions:{
    TimePlusPlus(){
      this.time+=1;
    },
    clearTime(){
      this.time = 0;
    },
    OpenTimer(){
      this.isStarted = true
    },
    CloseTimer(){
      this.isStarted = false
    },
    ChangeTime(time:number){
      this.time = time;
    }
  }
})
