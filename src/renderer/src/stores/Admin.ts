import {defineStore} from 'pinia'
import {ref} from "vue";
import {getNotice, getTargetTime} from "../api/API";


export const AdminStore = defineStore('admin', {
  // other options...
  state: () => {
    return {
      noticeHTML:ref(''),
    }
  },
  getters: {},
  actions: {
    async getNotice():Promise<string>{
      let res = await getNotice()
      if (res.success) {
        this.noticeHTML = res.data;
      }
      return this.noticeHTML
    }
  }
})
