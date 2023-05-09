import { defineStore } from 'pinia'
import {ref} from "vue";
import {SettingFile} from "../utils/Setting";
import {TimerStore} from "./Timer";

// 第一个参数是应用程序中 store 的唯一 id
export const GlobalStore = defineStore('main', {
  // other options...
  state:()=>{
    return{
      loginPanel:ref(false),
      UserList:ref([]),
      UserInfo:ref({}),
      Settings:ref({}),
      ProjectLink:'https://github.com/AuroraStudio-SGU/AuroraTimer_Next'
    }
  },
  getters:{

  },
  actions:{
    changeLoginPanel(){
      this.loginPanel = true
    },
    loadAllSetting(setting:SettingFile){
      this.UserInfo = setting.userInfo
      const timeStore = TimerStore()
      console.log(setting.progressBar.color)
      timeStore.progressColor = setting.progressBar.color
    }
  }
})
