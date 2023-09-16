import {defineStore} from 'pinia'
import {ref} from "vue";


export const AdminStore = defineStore('admin', {
  // other options...
  state: () => {
    return {
      noticeHTML:ref(''),
    }
  },
  getters: {},
  actions: {}
})
