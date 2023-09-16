import { defineStore } from 'pinia'
import {ref} from "vue";
import {DefaultSetting, SettingFile} from "../utils/Setting";
import {getRank} from "../api/API";
import {error} from "electron-log";
const themes = [
  "Earth",
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
      UserRankList:ref([]),//排行榜缓存
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
    getUserInfo(state):UserInfo{
      return state.UserInfo
    }
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
    },
    setUserInfo(user){
      this.UserInfo = user
    },
    async getUserRankList(isRefresh:boolean,index?:number){
      if(this.UserRankList.length==0 || isRefresh){
        //获取新Rank
        if(index==undefined) index = 0;
        let Response = await getRank(index);
        if(Response.success){
          this.UserRankList.value = Response.data
          return Response.data;
        }else {
          return null
        }
      }else {
        return this.UserRankList
      }
    }
  }
})
