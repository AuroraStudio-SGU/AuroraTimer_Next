import { defineStore } from 'pinia'
import {ref} from "vue";

// 第一个参数是应用程序中 store 的唯一 id
export const TimerStore = defineStore('timer', {
  // other options...
  state:()=>({
    percent:ref(0),
    size:ref(0)
  }),
  getters:{
    getPercent:()=>{
      return state.percent
    }
  }
})
