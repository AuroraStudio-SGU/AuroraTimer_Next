import { defineStore } from 'pinia'
import {ref} from "vue";
import {DefaultSetting, SettingFile} from "../utils/Setting";
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
]; //主题列表

export const GlobalStore = defineStore('main', {
  state:()=>{
    return{
      loginPanel:ref(false),
      UserList:ref([]),
      UserInfo:ref({}),
      ProjectLink:'https://github.com/AuroraStudio-SGU/AuroraTimer_Next',
      currentTheme:ref('valentine'),
      Setting:ref(DefaultSetting),
      ThemeList:themes,
      lastMousePoint:false,
      AFKDetected:false,
      isAFK:ref(false),
    }
  },
  getters:{

  },
  actions:{
    changeLoginPanel(){
      this.loginPanel = true
    },
    loadAllSetting(setting:SettingFile){
      this.Setting = setting
    },
    changeTheme(theme:string){
      this.currentTheme = theme
    }
  }
})
