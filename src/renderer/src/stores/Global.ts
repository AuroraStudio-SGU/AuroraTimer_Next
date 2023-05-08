import { defineStore } from 'pinia'
import {ref} from "vue";

// 第一个参数是应用程序中 store 的唯一 id
export const GlobalStore = defineStore('main', {
  // other options...
  state:()=>{
    return{
      loginPanel:ref(false),
      UserList:ref([]),
      UserInfo:ref({}),
      Settings:ref({})
    }
  },
  getters:{

  },
  actions:{
    changeLoginPanel(){
      this.loginPanel = true
    }
  }
})
