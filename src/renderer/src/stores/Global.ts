import { defineStore } from 'pinia'
import {ref} from "vue";
import {SettingFile} from "../utils/Setting";
import {TimerStore} from "./Timer";
const themes = [
  "light",
  "dark",
  "cupcake",
  "bumblebee",
  "emerald",
  "corporate",
  "synthwave",
  "retro",
  "cyberpunk",
  "valentine",
  "halloween",
  "garden",
  "forest",
  "aqua",
  "lofi",
  "pastel",
  "fantasy",
  "wireframe",
  "black",
  "luxury",
  "dracula",
  "cmyk",
  "autumn",
  "business",
  "acid",
  "lemonade",
  "night",
  "coffee",
  "winter",
];
// 第一个参数是应用程序中 store 的唯一 id
export const GlobalStore = defineStore('main', {
  // other options...
  state:()=>{
    return{
      loginPanel:ref(false),
      UserList:ref([]),
      UserInfo:ref({}),
      Settings:ref({}),
      ProjectLink:'https://github.com/AuroraStudio-SGU/AuroraTimer_Next',
      currentTheme:ref('valentine'),
      ThemeList:themes,
      lastMousePoint:false,
      AFKDetected:false,
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
      timeStore.progressColor = setting.progressBar.color
    },
    changeTheme(theme:string){
      this.currentTheme = theme
    }
  }
})
